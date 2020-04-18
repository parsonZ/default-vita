import React from 'react';
import { hot } from 'react-hot-loader/root'
import { Row, Col, Card } from 'antd';
import LikeButton from '@src/Aragorn/Common/LikeButton'
import Content from './Content'
import { useSelector, useDispatch } from 'react-redux'
import { CONTENT_SHOW } from '@src/Store/Actions/Common/instance'

const Cardbody = (props) => {
    const dispatch = useDispatch()
    const handleClick = React.useCallback(() => {
        dispatch({
            type: CONTENT_SHOW,
            payload: true
        })
    }, [dispatch])

    return (
        <Card title={props.title}>
            <p>{props.desc}</p>
            <footer>
                <LikeButton onClick={handleClick}>Learn Morn</LikeButton>
            </footer>
            {props.showContent ? <Content>{props.desc}</Content> : null}
            {/* {content 组件应该在全局} todo*/}
        </Card>
    )
}

const Artical = () => {
    const showContent = useSelector(state => state.Common.content.show)
    const [data,] = React.useState(Array(20).fill(null).map((v, i) => {
        return {
            title: `文章${i + 1}`,
            datetime: '2018-04-03 12:12:12',
            id: i + 1,
            author: 'parsonz',
            author_img: '',
            desc: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'
        }
    }))

    return (
        <Row gutter={[16, 16]}>
            {data.map((v, i) => (
                <Col xs={24} sm={12} md={12} lg={12} xl={8} key={v.id}>
                    <Cardbody {...v} showContent={showContent} />
                </Col>
            ))}
        </Row>
    )
}

export default hot(Artical)
