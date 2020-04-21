import { GET_ARTICLE_DETAILS } from '@src/Store/Actions/Common/instance'
import { combineEpics, ofType } from 'redux-observable'
import { switchMap } from 'rxjs/operators'
import { Ajax } from '@src/Eden/Utils/request.js'

const getArticleDetailsEpic = action$ =>
    action$
        |> ofType(GET_ARTICLE_DETAILS)
        |> switchMap(action => {
            return Ajax({ url: '/api', type: 'get' }, action$, action.payload)
        })
            |> switchMap(res => {
                if (res.isSuccess) {
                    alert(res.payload.msg)
                    return []
                }
                return res
            })

export default combineEpics(
    getArticleDetailsEpic
)
