import produce from 'immer'
import { NOTIFICATION} from '@src/Store/Actions/Common/instance'

const initialState = {
    content: {
        show: false
    },
    notification: ''
}

export default (state = initialState, action) => produce(
    state, draft => {
        switch (action.type) {
            case NOTIFICATION:
                draft.notification = action.payload
                return
            default:
                return
        }
    }
)
