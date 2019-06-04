import React, { Component } from 'react';
import { Stage } from 'react-pixi-fiber';
import Bird from './component/Bird';
import GameScene from './component/GameScene';
import './App.sass';
import { AppContext } from 'context/provider';

export default class App extends Component {
    static contextType = AppContext;

    componentDidMount() {
        const app = document.getElementById('App');

        this.context.funcs.updateAppState({
            key: 'game',
            payload: {
                canvasWidth: parseInt(app.offsetWidth),
                canvasHeight: parseInt(app.offsetHeight),
            },
        });
    }

    render() {
        const { game: gameState = {} } = this.context;
        const { canvasWidth, canvasHeight } = gameState;

        const stageOptions = {
            transparent: true,
            // backgroundColor: 0x10bb99,
        };
        return (
            <div id="App">
                <Stage
                    width={canvasWidth}
                    height={canvasHeight}
                    options={stageOptions}
                >
                    <GameScene width={canvasWidth} height={canvasHeight} />
                    <Bird x={canvasWidth / 3} y={canvasHeight / 2} />
                </Stage>
            </div>
        );
    }
}
