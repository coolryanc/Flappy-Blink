import React, { Component } from 'react';
import GameScene from './component/GameScene';
import './App.sass';

export default class App extends Component {
    state = {
        canvasWidth: 0,
        canvasHeight: 0,
    };

    componentDidMount() {
        const app = document.getElementById('App');

        this.setState({
            canvasWidth: parseInt(app.offsetWidth),
            canvasHeight: parseInt(app.offsetHeight),
        });
    }

    render() {
        const { canvasWidth, canvasHeight } = this.state;
        const couldRenderGame = canvasWidth && canvasHeight;
        return (
            <div id="App">
                {couldRenderGame ? (
                    <GameScene width={canvasWidth} height={canvasHeight} />
                ) : null}
            </div>
        );
    }
}
