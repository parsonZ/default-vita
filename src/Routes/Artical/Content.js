import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root'
import { useDispatch } from 'react-redux'
import { CONTENT_SHOW } from '@src/Store/Actions/Common/instance'

const Wrapper = (props) => {
    const dispatch = useDispatch()
    return (
        <div><button onClick={() => {
            dispatch({
                type: CONTENT_SHOW,
                payload: false
            })
        }}>close</button>{props.children}</div>
    )
}

const Content = (props) => {
    return ReactDOM.createPortal(
        <Wrapper {...props} />,
        document.body
    )
}

export default hot(Content)
