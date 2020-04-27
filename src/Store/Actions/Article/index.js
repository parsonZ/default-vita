import {
    GET_ARTICLE_DETAILS,
    OPEN_ARTICLE_STUDIO,
    CURRENT_ID
} from './instance'

export const getArticleDetails = () => ({
    type: GET_ARTICLE_DETAILS
})

export const openArticleStudio = (pyload) => ({
    type: OPEN_ARTICLE_STUDIO,
    pyload
})

export const commitCurrent = (pyload) => ({
    type: CURRENT_ID,
    pyload
})
