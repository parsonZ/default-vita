import React from 'react';
import { hot } from 'react-hot-loader/root'
import { Card, Skeleton, Avatar, Progress } from 'antd';
import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons'
import LikeButton from '@src/Aragorn/Common/LikeButton'
import Content from './Content'
import { useDispatch } from 'react-redux'
import { CONTENT_SHOW } from '@src/Store/Actions/Common/instance'
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

const STYLE = {
    AVATAR: {
        margin: '30px'
    }
}

const Cardbody = (props) => {
    const dispatch = useDispatch()
    const [percent, setPercent] = React.useState(0)
    const [show, setShow] = React.useState(false)
    const handleClick = React.useCallback(() => {
        dispatch({
            type: CONTENT_SHOW,
            payload: true
        })
        setPercent(100);
        setShow(true);
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
                <Avatar className={show ? 'animated fadeOut' : ''} style={STYLE.AVATAR} size="large" icon={<UserOutlined />} />
                <DivDate>
                    <span className={show ? 'animated fadeOut' : ''}><FieldTimeOutlined />{props.month}</span>
                    <span className={show ? 'animated fadeOut' : ''}><FieldTimeOutlined />{props.time}</span>
                </DivDate>
            </DivContent>
            <footer>
                <LikeButton onClick={handleClick}>Learn Morn</LikeButton>
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
