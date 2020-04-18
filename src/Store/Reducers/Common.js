import produce from 'immer'
import { CONTENT_SHOW } from '@src/Store/Actions/Common/instance'

const initialState = {
    content: {
        show: false
    }
}

export default (state = initialState, action) => produce(
    state, draft => {
        switch (action.type) {
            case CONTENT_SHOW:
                draft.content.show = action.payload
                return
            default:
                return
        }
    }
)
