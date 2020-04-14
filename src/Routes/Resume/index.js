import React from 'react';
import { hot } from 'react-hot-loader/root'
import '../../Aragorn/Common/Banner'
import { Timeline } from 'antd';
import { Grid, Row, Col } from 'react-flexbox-grid'
import { HomeOutlined, CheckCircleTwoTone, HeartTwoTone } from '@ant-design/icons';

class Home extends React.Component {
    render() {
        return (
            <>
                <pz-banner></pz-banner>
                <Grid fluid>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Timeline mode="alternate">
                                <Timeline.Item dot={<HeartTwoTone twoToneColor="#eb2f96" />}>Create a services site 2015-09-01</Timeline.Item>
                                <Timeline.Item dot={<HomeOutlined twoToneColor="#eb2f96" />}>Solve initial network problems 2015-09-01</Timeline.Item>
                                <Timeline.Item dot={<HeartTwoTone twoToneColor="#eb2f96" />}>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                                    beatae vitae dicta sunt explicabo.
                                </Timeline.Item>
                                <Timeline.Item dot={<HomeOutlined twoToneColor="#eb2f96" />}>Network problems being solved 2015-09-01</Timeline.Item>
                                <Timeline.Item dot={<HeartTwoTone twoToneColor="#eb2f96" />}>Create a services site 2015-09-01</Timeline.Item>
                                <Timeline.Item dot={<CheckCircleTwoTone twoToneColor="#52c41a" />}>
                                    Technical testing 2015-09-01
                                </Timeline.Item>
                            </Timeline>
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}

export default hot(Home)