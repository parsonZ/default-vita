import React from 'react';
import { hot } from 'react-hot-loader/root'
import { Collapse } from 'antd';

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

class Artical extends React.Component {
    render() {
        return (
            <main>
                <Collapse accordion>
                    <Panel header="This is panel header 1" key="1">
                        <p>{text}</p>
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                        <p>{text}</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>{text}</p>
                    </Panel>
                </Collapse>
            </main>
        )
    }
}

export default hot(Artical)
