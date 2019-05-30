import React, { Component } from 'react';
import { AppContext } from './provider';

export default class AppConsumer extends Component {
    render() {
        const { children } = this.props;

        return (
            <AppContext.Consumer>
                {({ state }) => {
                    return React.Children.map(children, child =>
                        React.cloneElement(child, {
                            state,
                        })
                    );
                }}
            </AppContext.Consumer>
        );
    }
}
