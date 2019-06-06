import React, { Component } from 'react';
import Game from './component/Game';
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

        this.context.funcs.updateAppState({
            key: 'bird',
            payload: {
                x: parseInt(app.offsetWidth) / 3,
                y: parseInt(app.offsetHeight) / 2,
            },
        });
    }

    render() {
        return (
            <div id="App">
                <Game {...this.context} />
            </div>
        );
    }
}
