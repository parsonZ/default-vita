import {
    NOTIFICATION
} from './instance'
export function dispatchNotification(payload) {
    return {
        type: NOTIFICATION,
        payload
    }
}
