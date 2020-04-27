import { GET_ARTICLE_DETAILS, OPEN_ARTICLE_STUDIO } from '@src/Store/Actions/Article/instance'
import { combineEpics, ofType } from 'redux-observable'
import { switchMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { Ajax } from '@src/Eden/Utils/request.js'

const getArticleDetailsEpic = action$ =>
    action$
        |> ofType(GET_ARTICLE_DETAILS)
        |> switchMap(action => {
            return Ajax({ url: '/api', type: 'get' }, action$, action.payload)
        })
            |> switchMap(res => {
                if (res.isSuccess) {
                    return of({
                        type: OPEN_ARTICLE_STUDIO,
                        payload: res.payload
                    })
                }
                return res
            })

export default combineEpics(
    getArticleDetailsEpic
)
