import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root'
import { useDispatch, useSelector } from 'react-redux'
import { CONTENT_SHOW } from '@src/Store/Actions/Common/instance'
import Styled from 'styled-components'

const Div = Styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: ${props => props.showContent ? '100%' : 0};
    height: ${props => props.showContent ? '100%' : 0};
    z-index: 10;
    background: #fff;
    transition: all 1s cubic-bezier(0.94, 0.14, 0.1, 0.85);
`;

const Wrapper = (props) => {
    const dispatch = useDispatch()
    return (
        <Div {...props}>
            <button onClick={() => {
                dispatch({
                    type: CONTENT_SHOW,
                    payload: false
                })
            }}>close</button>
        </Div>
    )
}

const Content = (props) => {
    const showContent = useSelector(state => state.Common.content.show)

    return showContent ? ReactDOM.createPortal(
        <Wrapper {...props} showContent />,
        document.body
    ) : null
}

export default hot(React.memo(Content))
