/* eslint-disable camelcase */
import isString from 'lodash/isString'
import get from 'lodash/get'
import merge from 'lodash/merge'
import HOST from 'Nevermore/Common/host'
import { of, throwError, timer, from } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { NOTIFICATION, WITHOUT_LOGIN, LOGINED } from 'Store/Actions/Common/instance'
import { isWithoutLogin } from 'Eden/Utils/isSomething'
import { takeUntil, catchError, switchMap, scan, concat, tap, exhaustMap, retryWhen, delayWhen, map, take, ignoreElements, timeout } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { reportServiceConfig } from './reportServiceConfig'

const LOGINERROR = new Error('without login')
const LOGINCANCEL = new Error('cancel because logout')
const getAction = action => isString(action) ? get(HOST, insert(action.split('.'), 1, 'action')) : action
const getDomain = domain => {
    if (isString(domain)) {
        let debug = get(HOST, domain.split('.').slice(0, 1).concat(['debug']))

        if (process.env.NODE_ENV === 'development' && debug) {
            return debug
        }
        return get(HOST, domain.split('.').slice(0, 1).concat(['domain']))
    }
    return domain
}

const insert = (array, index, value) => {
    let clone = array.slice()

    clone.splice(index, 0, value)
    return clone
}

export const Ajax = (action, action$, payload, options) => {
    if (checkParams(action, payload)) {
        let ts = 0

        let requestStartTime = Date.now()

        return ajax({
            withCredentials: true,
            url: giveMeUrl(action, payload),
            ...merge(options, { headers: { TS: Date.now() }})
        })
        |> takeUntil(
            action$
            |> ofType(WITHOUT_LOGIN)
            |> concat(throwError(LOGINCANCEL))
        )
        |> switchMap(v => {
            ts = Date.now() - requestStartTime
            if (isWithoutLogin(v.response.status)) {
                return throwError(LOGINERROR)
            }
            if (v.response.status || v.response.code || v.response.errcode || v.response.error_code) {
                return requestError(new Error(v.response.msg || v.response.message), v.response.status || v.response.code || v.response.errcode || v.response.error_code)
            }
            return requestSuccess(v.response)
        })
        |> tap(() => {
            let service = action.split('.')[0]

            if (reportServiceConfig.hasOwnProperty(service) && process.env.NODE_ENV !== 'development') {
                let url = giveMeUrl(action, payload)

                let c = reportServiceConfig[service].find(v => url.includes(v.url))

                if (c) {
                    const reportUrl = giveMeUrl('reportService.timeCost', {
                        url_type: c.urlType,
                        time_cost: ts
                    })

                    // 后续修改为ajax
                    from(fetch(reportUrl, {
                        headers: new Headers({ ts: Date.now() })
                    }))
                    |> ignoreElements()
                }
            }
        })
        |> timeout(30000)
        |> retryWhen(err$ => err$
            |> scan((times, err) => {
                if (times > 3 || err === LOGINCANCEL || err === LOGINERROR || (err.name === 'TimeoutError' && action === 'qmap.getQueryTasks') || action === 'midwork.searchCrowdSourceByLinkOrPolygon') {
                    throw err
                }
                return times + 1
            }, 0)
            |> delayWhen(times => timer(1000 * times))
        )
        |> catchError((err, source$) => {
            switch (err) {
                case LOGINERROR:
                    return of({ type: WITHOUT_LOGIN, isWithoutLogin: true })
                    |> concat(
                        action$ |> ofType(LOGINED) |> take(1) |> exhaustMap(() => source$)
                    )
                case LOGINCANCEL:
                    return action$ |> ofType(LOGINED) |> take(1) |> exhaustMap(() => source$)
                default:
                    return networkError(err)
            }
        })
    }
    return paramsError(giveMeUrl(action, payload))
}

export const checkParams = (action, params) => action === '@@empty' || getAction(action).params.filter(v => !v.includes('?') && !v.includes(':')).every(v => params[v] !== void 0)

export const giveMeUrl = (path, params) => {
    if (!isString(path) || path === '@@empty') {
        return 'go/fuck/yourself'
    }
    let publicUrl = window.origin

    let action = getAction(path)

    let url = action.url

    let domain = getDomain(path)

    let newParams = giveMeParams(path, params)

    if (domain.includes('//')) {
        publicUrl = ''
    }
    return action.type === 'get'
        ? publicUrl + domain + url + '?' + Object.keys(newParams).map(v => v + '=' + newParams[v]).join('&')
        : publicUrl + domain + url
}

export const giveMeParams = (path, payload) => {
    if (!isString(path) || !payload) {
        return {}
    }
    return getAction(path).params
        .reduce((a, b) => {
            let B = b

            if (B.includes(':')) {
                B = B.split(':')
                a[B[0]] = payload[B[0]] || B.slice(1).join(':')
                return a
            }
            if (B.includes('?')) {
                B = B.split('?')[0]
                if (payload[B] === void 0 || payload[B] === null) {
                    return a
                }
            }
            a[B] = payload[B]
            return a
        }, {})
}

export const paramsError = url => of({
    type: NOTIFICATION,
    payload: {
        type: 'error',
        message: '请求参数错误',
        description: `此次请求缺少必要的参数，因此被拦截。请联系前端工程师。（${url}）`
    },
    isParamsError: true
})

export const networkError = error => of({
    type: NOTIFICATION,
    payload: {
        type: 'disconnect',
        message: '请求失败',
        description: `请求失败，请稍后再试！若是反复出现，请联系后端工程师：${error.request ? error.request.url : ''} ${error.message}`
    },
    isNetworkError: true
// eslint-disable-next-line no-console
}) |> tap(() => console.error(error))

export const requestError = (error, status) => networkError(error)
    |> map(v => ({ ...v, isRequestError: true, status }))

export const requestSuccess = payload => of({
    type: '@@REQUEST_SUCCESS',
    payload,
    isSuccess: true
})

export const stringfy = params => Object.keys(params).map(v => v + '=' + params[v]).join('&')
