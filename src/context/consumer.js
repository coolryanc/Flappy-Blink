import React, { Component } from 'react';
import { AppContext } from './provider';

export default class AppConsumer extends Component {
    render() {
        const { children } = this.props;
        console.log(children);

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
