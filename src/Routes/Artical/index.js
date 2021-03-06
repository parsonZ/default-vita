import React from 'react';
import { hot } from 'react-hot-loader/root'
import { Card, Skeleton, Avatar, Progress } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons'
import LikeButton from '@src/Aragorn/Common/LikeButton'
import { useDispatch } from 'react-redux'
import { GET_ARTICLE_DETAILS } from '@src/Store/Actions/Article/instance'
import Styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const DivContent = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DivDate = Styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-bottom: 20px;
    span {
        display: flex;
        align-items: center;
    }
    .anticon {
        margin-right: 5px;
    }
`;

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

const Cardbody = (props) => {
    const dispatch = useDispatch()
    const [percent, setPercent] = React.useState(0)
    const [show, setShow] = React.useState(false)
    const [color,] = React.useState(ColorList)
    const handleClick = React.useCallback(() => {
        setPercent(100);
        setShow(true);
        dispatch({
            type: GET_ARTICLE_DETAILS,
            payload: 123
        })
    }, [dispatch, setPercent, setShow])

    return (
        <Card hoverable>
            <Skeleton loading={false} active></Skeleton>
            <DivContent>
                <h2 className={show ? 'animated fadeOutUp' : ''}>{props.title}</h2>
                <Progress
                    style={{ width: '40%' }}
                    strokeWidth={2}
                    showInfo={false}
                    percent={percent}
                    status="active"
                />
                <Avatar className={show ? 'animated zoomOut' : ''} style={{ margin: '2rem', background: color[Math.ceil(Math.random() * 3)] }} size="large" shape="square">
                    {props.title.slice(0, 1)}
                </Avatar>

                <DivDate>
                    <span className={show ? 'animated fadeOutLeft' : ''}><FieldTimeOutlined />{props.month}</span>
                    <span className={show ? 'animated fadeOutRight' : ''}><FieldTimeOutlined />{props.time}</span>
                </DivDate>
            </DivContent>
            <footer style={{ 'display': 'flex', 'justifyContent': 'center' }}>
                <LikeButton onClick={handleClick} show={show.toString()}>Learn Morn</LikeButton>
            </footer>
        </Card>
    )
}

const Artical = () => {
    const [data,] = React.useState(Array(10).fill(null).map((v, i) => {
        return {
            title: `webpack如何配置${i % 2 === 0 ? 'webpack如何配置webpack如何配置' : i}`,
            datetime: '2018-04-03  12:12:12',
            month: '2018-04-03',
            time: '12:12:12',
            id: i + 1,
            author: 'parsonz',
            author_img: '',
            desc: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'
        }
    }))

    return (
        <div className="waterfall-wrap">
            <TransitionGroup appear={true}>
                {data.map((v, i) => (
                    <CSSTransition
                        key={i}
                        classNames='article-transition'
                        timeout={{ enter: 500, exit: 300 }}
                    >
                        <div className="waterfall-item"><Cardbody {...v} /></div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}

export default hot(Artical)
