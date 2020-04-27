import { OPEN_ARTICLE_STUDIO, CURRENT_ID } from '@src/Store/Actions/Article/instance'
import { combineEpics, ofType } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'
import { history } from '@src/Routes'
import { of } from 'rxjs'

const openArticleStudio = action$ =>
    action$
        |> ofType(OPEN_ARTICLE_STUDIO)
        |> map(action => {
            history.push('/full/studio')
            return action.payload
        })
        |> switchMap(res => of({
            type: CURRENT_ID,
            payload: res
        }))

export default combineEpics(
    openArticleStudio
)
