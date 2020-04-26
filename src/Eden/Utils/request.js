/* eslint-disable camelcase */
import merge from 'lodash/merge'
import { of, timer } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { catchError, switchMap, scan, retryWhen, delayWhen, tap, timeout, map } from 'rxjs/operators'

const giveMeUrl = (action, params) => {
    
    let publicUrl = process.env.REACT_APP_URL

    let url = action.url

    return action.type === 'get'
        ? publicUrl  + url + (params ? '?' + Object.keys(params).map(v => v + '=' + params[v]).join('&') : '')
        : publicUrl  + url
}

export const Ajax = (action, action$, payload, options) => {
    return ajax({
        url: giveMeUrl(action, payload),
        ...merge(options, { headers: { TS: Date.now() }})
    })
    |> switchMap(v => {
        if (v.response.status || v.response.code || v.response.errcode || v.response.error_code) {
            return requestError(new Error(v.response.msg || v.response.message), v.response.status || v.response.code || v.response.errcode || v.response.error_code)
        }
        return requestSuccess(v.response)
    })
    |> timeout(20000)
    |> retryWhen(err$ => err$
        |> scan((times, err) => {
            if (times >= 2 ) {
                throw err
            }
            return times + 1
        }, 0)
        |> delayWhen(times => timer(1000 * times))
    )
    |> catchError((err, source$) => {
        return of(networkError(err))
    })
}

export const networkError = error => of({
    type: 'NOTIFICATION',
    payload: {
        type: 'disconnect',
        message: '请求失败',
        description: '请求失败，请稍后再试'
    },
    isNetworkError: true
})
|> tap(() => {
    alert('请求失败')
})

export const requestError = (error, status) => networkError(error)
    |> map(v => ({ ...v, isRequestError: true, status }))

export const requestSuccess = payload => of({
    type: '@@REQUEST_SUCCESS',
    payload,
    isSuccess: true
})
