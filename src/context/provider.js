import React, { Component } from 'react';
import { gameStatusEnum, birdStatusEnum } from 'utils/appEnums';

const DEFAULT_STATE = {
    state: {
        game: {
            status: gameStatusEnum.START,
        },
        player: {
            score: '',
        },
        bird: {
            status: birdStatusEnum.NORMAL,
        },
        pipe: {},
    },
};

export const AppContext = React.createContext(DEFAULT_STATE);

export default class AppProvider extends Component {
    state = DEFAULT_STATE;

    render() {
        return (
            <AppContext.Provider
                value={{
                    ...this.state,
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}
