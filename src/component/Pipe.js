import { CustomPIXIComponent } from 'react-pixi-fiber';
import React, { Component } from 'react';
import { Container, withApp } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
// context
import { AppContext } from 'context/provider';

// RECT component
const TYPE = 'RECT';
const behavior = {
    customDisplayObject: props => new PIXI.Graphics(),
    customApplyProps: function(instance, props, nextProps) {
        const { fill, x, y, width, height, ...newPropsRest } = nextProps;
        const {
            fill: oldFill,
            x: oldX,
            y: oldY,
            width: oldWidth,
            height: oldHeight,
            ...oldPropsRest
        } = props;
        if (typeof props !== 'undefined') {
            instance.clear();
        }

        instance.beginFill(fill);
        instance.drawRect(x, y, width, height);
        instance.lineStyle(2, 0x000000);
        instance.endFill();

        this.applyDisplayObjectProps(oldPropsRest, newPropsRest);
    },
};
const Rect = CustomPIXIComponent(behavior, TYPE);

// const for Pipe component

class Pipe extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this._pipeInnerDistance = 130;
        this._pipeWidth = 50;

        this.state = {
            x: 0,
            y: 0,
        };
    }

    componentDidMount = () => {
        const { app, pipeStartPos } = this.props;
        this._reset(pipeStartPos);
        app.ticker.add(this._updatePipePosition);
    };

    componentWillUnmount() {
        const { app } = this.props;
        app.ticker.remove(this._updatePipePosition);
    }

    _reset = pos => {
        const { width } = this.props;
        const pipeMinHeight = 80;
        const randomNum =
            2 *
            Math.random() *
            (width - 2 * pipeMinHeight - this._pipeInnerDistance);

        this.setState({
            x: pos,
            y: pipeMinHeight + randomNum,
        });
    };

    _updatePipePosition = () => {
        const { speedX } = this.context.game;
        const { width } = this.props;
        this.setState(
            state => ({
                x: state.x - speedX / 60,
            }),
            () => {
                if (this.state.x < -this._pipeWidth) {
                    this._reset(width + 20);
                }
            }
        );
    };

    render() {
        const { _pipeWidth, _pipeInnerDistance } = this;
        const { x, y } = this.state;

        return (
            <Container>
                <Rect
                    x={x}
                    y={0}
                    width={_pipeWidth}
                    height={y}
                    fill={'0x2c9f45'}
                />
                <Rect
                    x={x}
                    y={y + _pipeInnerDistance}
                    width={_pipeWidth}
                    height={500}
                    fill={'0x2c9f45'}
                />
            </Container>
        );
    }
}

const PipeWithApp = withApp(Pipe);

export default PipeWithApp;
