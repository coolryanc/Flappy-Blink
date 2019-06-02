import React, { Component } from 'react';
import { Stage } from 'react-pixi-fiber';
import Bird from './component/Bird';
import './App.sass';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            containerSize: {
                width: 0,
                height: 0,
            },
        };
    }

    componentDidMount() {
        const app = document.getElementById('App');
        this.setState({
            containerSize: {
                width: parseInt(app.offsetWidth),
                height: parseInt(app.offsetHeight),
            },
        });
    }

    render() {
        const { width, height } = this.state.containerSize;
        const stageOptions = {
            // transparent: true,
            backgroundColor: 0x10bb99,
        };
        return (
            <div id="App">
                <Stage width={width} height={height} options={stageOptions}>
                    <Bird x={width / 2} y={height / 2} />
                </Stage>
            </div>
        );
    }
}
