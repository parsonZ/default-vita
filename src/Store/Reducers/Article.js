import produce from 'immer'
import {
    CURRENT_ID
} from '@src/Store/Actions/Article/instance'

const initialState = {
    current: {}
}

export default (state = initialState, action) => produce(
    state, draft => {
        switch (action.type) {
            case CURRENT_ID:
                draft.current = action.payload
                return
            default:
                return
        }
    }
)
