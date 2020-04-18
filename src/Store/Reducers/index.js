import { combineReducers } from 'redux'
import { setAutoFreeze } from 'immer'

setAutoFreeze(false)
const injectReducer = (r => r.keys().reduce((a, b) => ({ ...a, [/((?!\/)(?!\.)[\s\S])+/.exec(b)[0]]: r(b).default }), {}))(require.context('./', true, /^\.\/(((?!\/)(?!index)[\s\S])+|(((?!\/)[\s\S])+\/)+index)\.js$/))
const rootReducer = combineReducers({
    ...injectReducer
})

export default rootReducer
