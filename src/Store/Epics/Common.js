import { GET_ARTICLE_DETAILS } from '@src/Store/Actions/Common/instance'
import { combineEpics, ofType } from 'redux-observable'
import { switchMap } from 'rxjs/operators'

const getArticleDetailsEpic = action$ =>
    action$
        |> ofType(GET_ARTICLE_DETAILS)
        |> switchMap(action => {
            return fetch('http://140.143.134.239/api', {
                mode: 'cors'
            }).then(res => res.json())
        })
        |> switchMap(res => {
            alert(res.msg)
            return []
        })

export default combineEpics(
    getArticleDetailsEpic
)
