import React from 'react';
import { hot } from 'react-hot-loader/root'
import '../../Aragorn/Common/Banner'
import { Timeline } from 'antd';
import { Row, Col } from 'antd';
import { HomeOutlined, CheckCircleTwoTone, HeartTwoTone, FieldTimeOutlined } from '@ant-design/icons';

const Home = () => {
    const [mode, setMode] = React.useState('alternate');
    const [clientWidth, setClientWidth] = React.useState(document.documentElement.clientWidth)
    const onResize = React.useCallback(() => setClientWidth(document.documentElement.clientWidth),[])

    React.useEffect(() => {
        if (clientWidth > 760) {
            setMode('alternate')
        } else {
            setMode('left')
        }
    }, [setMode, clientWidth])

    React.useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize)
        }
    })

    return (
        <>
            <pz-banner></pz-banner>
            <Row>
                <Col>
                    <Timeline mode={mode}>
                        <Timeline.Item dot={<HeartTwoTone twoToneColor="#eb2f96" />} label={<><FieldTimeOutlined />2010-10-10</>}>Create a services site</Timeline.Item>
                        <Timeline.Item dot={<HomeOutlined twoToneColor="#eb2f96" />} label={<><FieldTimeOutlined />2010-10-10</>}>Solve initial network problems</Timeline.Item>
                        <Timeline.Item dot={<HeartTwoTone twoToneColor="#eb2f96" />} label={<><FieldTimeOutlined />2010-10-10</>}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                            beatae vitae dicta sunt explicabo.
                        </Timeline.Item>
                        <Timeline.Item dot={<HomeOutlined twoToneColor="#eb2f96" />} label={<><FieldTimeOutlined />2010-10-10</>}>Network problems being solved</Timeline.Item>
                        <Timeline.Item dot={<HeartTwoTone twoToneColor="#eb2f96" />} label={<><FieldTimeOutlined />2010-10-10</>}>Create a services site</Timeline.Item>
                        <Timeline.Item dot={<CheckCircleTwoTone twoToneColor="#52c41a" />} label={<><FieldTimeOutlined />2010-10-10</>}>
                            Technical testing
                        </Timeline.Item>
                    </Timeline>
                </Col>
            </Row>
        </>
    )
}

export default hot(Home)