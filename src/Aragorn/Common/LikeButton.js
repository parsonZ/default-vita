import React from 'react';
import '@src/Aragorn/Styles/likeButton.scss'

const LikeButton = (props) => {
    return (
        <span className={`like-span learn-more ${props.show === 'true' ? 'cactive' : ''}`} {...props}>
            <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
            </span>
            <span className="button-text">{props.children}</span>
        </span>
    )
}

export default LikeButton
