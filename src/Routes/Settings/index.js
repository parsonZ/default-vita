import React from 'react';
import { hot } from 'react-hot-loader/root'
import { Drawer, Button } from 'antd';
import { Comment, Tooltip, List } from 'antd';
import moment from 'moment';

const data = [
    {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
      ),
      datetime: (
            <Tooltip
                title={moment()
                .subtract(1, 'days')
                .format('YYYY-MM-DD HH:mm:ss')}
            >
                <span>
                    {moment()
                    .subtract(1, 'days')
                    .fromNow()}
                </span>
            </Tooltip>
        ),
    },
    {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),
        datetime: (
            <Tooltip
                title={moment()
                .subtract(2, 'days')
                .format('YYYY-MM-DD HH:mm:ss')}
            >
                <span>
                    {moment()
                    .subtract(2, 'days')
                    .fromNow()}
                </span>
            </Tooltip>
        ),
    },
]

class Settings extends React.Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <main>
                 <div>
                    <Button type="primary" onClick={this.showDrawer}>
                        Open
                    </Button>
                    <Drawer
                        width={'40rem'}
                        title="Basic Drawer"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <List
                            className="comment-list"
                            header={`${data.length} replies`}
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <li>
                                    <Comment
                                    actions={item.actions}
                                    author={item.author}
                                    avatar={item.avatar}
                                    content={item.content}
                                    datetime={item.datetime}
                                    />
                                </li>
                            )}
                        />
                    </Drawer>
                </div>
            </main>
        )
    }
}

export default hot(Settings)
