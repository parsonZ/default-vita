import OPTIONS from '../../Nevermore/Common/loadable'
import loadable from '@loadable/component'

const resolveComponents = (resolve) => {
    return loadable(resolve, OPTIONS)
}

export {
    resolveComponents
}