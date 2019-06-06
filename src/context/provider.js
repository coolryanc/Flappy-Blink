import React, { Component } from 'react';
import { gameStatusEnum, birdStatusEnum } from 'utils/appEnums';

const DEFAULT_STATE = {
    game: {
        status: gameStatusEnum.START,
        gameSpeed: 120,
        landHeight: 80,
        canvasWidth: 0,
        canvasHeight: 0,
    },
    player: {
        score: '',
    },
    bird: {
        status: birdStatusEnum.NORNAL,
        x: 0,
        y: 0,
        rotation: 0,
        birdFallSpeed: 4,
        birdGravity: 0.1,
        speedY: 2,
    },
    pipe: {},
};

export const AppContext = React.createContext(DEFAULT_STATE);

export default class AppProvider extends Component {
    state = DEFAULT_STATE;

    funcs = {
        updateAppState: ({ key, payload }) => {
            if (this.state.hasOwnProperty(key)) {
                this.setState({
                    [key]: {
                        ...this.state[key],
                        ...payload,
                    },
                });
            }
        },
    };

    render() {
        return (
            <AppContext.Provider
                value={{
                    ...this.state,
                    funcs: this.funcs,
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}
