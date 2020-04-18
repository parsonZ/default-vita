import { createStore, applyMiddleware } from 'redux'
import rootReducer from './Reducers'
import rootEpic from './Epics'
import mediator from './Mediator'
import { createEpicMiddleware, ofType, combineEpics } from 'redux-observable'
import { BehaviorSubject } from 'rxjs'
import { mergeMap, takeUntil } from 'rxjs/operators'

const epicMiddleware = createEpicMiddleware()

function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(epicMiddleware)
    )
}
const epic$ = new BehaviorSubject(combineEpics(rootEpic, mediator))
const EPIC_END = 'EPIC_END'
const hotReloadingEpic = (action$, ...rest) =>
    epic$
    |> mergeMap(epic =>
        epic(action$, ...rest)
                |> takeUntil(action$
                    |> ofType(EPIC_END)
                )
    )
const Store = configureStore()

epicMiddleware.run(hotReloadingEpic)

export default Store

if (module.hot) {
    module.hot.accept('./Reducers', () => Store.replaceReducer(rootReducer))
    module.hot.accept(['./Epics', './Mediator'], () => {
        Store.dispatch({ type: EPIC_END })
        epic$.next(combineEpics(rootEpic, mediator))
    })
}
