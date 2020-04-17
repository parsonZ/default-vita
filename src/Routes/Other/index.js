import React from 'react';
import { hot } from 'react-hot-loader/root'
import { Button, notification } from 'antd';

const openNotificationWithIcon = type => {
    notification[type]({
        message: 'Notification Title',
        description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
};
class Other extends React.Component {
    render() {
        return (
            <main>
                <div>
                    <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
                    <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
                    <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
                    <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
                </div>
            </main>
        )
    }
}

export default hot(Other)
