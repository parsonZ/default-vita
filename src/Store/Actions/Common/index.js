import {
    CONTENT_SHOW,
    GET_ARTICLE_DETAILS
} from './instance'

export const setContentShow = payload => ({
    type: CONTENT_SHOW,
    payload
})

export const getArticleDetails = () => ({
    type: GET_ARTICLE_DETAILS
})

