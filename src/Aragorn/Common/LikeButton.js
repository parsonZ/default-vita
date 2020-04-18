import React from 'react';
import '@src/Aragorn/Styles/likeButton.scss'

const LikeButton = (props) => {
    return (
        <span className="learn-more" {...props}>
            <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
            </span>
            <span className="button-text">Learn More</span>
        </span>
    )
}

export default LikeButton
