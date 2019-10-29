/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import { TreeDashComponent } from '../lib';

class App extends Component {

    constructor() {
        super();
        this.state = {
            value: ''
        };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        return (
            <div>
                <TreeDashComponent
                    setProps={this.setProps}
                    {...this.state}
                />
            </div>
        )
    }
}

export default App;
