import { combineEpics } from 'redux-observable'
const injectEpics = (r => r.keys().map(k => r(k).default))(require.context('./', true, /^\.\/(((?!\/)(?!index)[\s\S])+|(((?!\/)[\s\S])+\/)+index)\.js$/))
const rootEpic = combineEpics(
    ...injectEpics
)

export default rootEpic
