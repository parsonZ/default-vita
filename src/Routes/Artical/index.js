import React from 'react';
import { hot } from 'react-hot-loader/root'
import { Row, Col, Card } from 'antd';
import LikeButton from '@src/Aragorn/Common/LikeButton'

const Cardbody = (props) => {
    
    const handleClick = React.useCallback(() => {
        alert(1)
    }, [])

    return (
        <article>
            <p>
                {props.desc}
            </p>
            <footer>
                <LikeButton onClick={handleClick}>1231</LikeButton>
            </footer>
        </article>
    )
}

const Artical = () => {
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
            {data.map(v => {
                return (
                    <Col xs={24} sm={12} md={12} lg={12} xl={8} key={v.id}>
                        <Card title={v.title}>
                            <Cardbody {...v} />
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )
}

export default hot(Artical)
