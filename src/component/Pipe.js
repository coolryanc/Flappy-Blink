import { CustomPIXIComponent } from 'react-pixi-fiber';
import React, { Component } from 'react';
import { Container, withApp } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

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

        instance.beginFill(0x2c9f45);
        instance.drawRect(x, y, width, height);
        instance.lineStyle(2, 0x000000);
        instance.endFill();

        this.applyDisplayObjectProps(oldPropsRest, newPropsRest);
    },
};
const Rect = CustomPIXIComponent(behavior, TYPE);

// const for Pipe component

class Pipe extends Component {
    constructor(props) {
        super(props);

        this._pipeInnerDistance = 230;
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
        const { canvasWidth } = this.props;
        const pipeMinHeight = 80;
        const randomNum =
            2 *
            Math.random() *
            (canvasWidth - 2 * pipeMinHeight - this._pipeInnerDistance);

        this.setState({
            x: pos,
            y: pipeMinHeight + randomNum,
        });
    };

    _updatePipePosition = () => {
        const { gameSpeed, canvasWidth } = this.props;
        this.setState(
            state => ({
                x: state.x - gameSpeed / 60,
            }),
            () => {
                const { funcs, group } = this.props;
                funcs.updateAppState({
                    key: 'pipe',
                    payload: {
                        [group]: {
                            x: this.state.x,
                            y: this.state.y,
                        },
                    },
                });
                if (this.state.x < -this._pipeWidth) {
                    this._reset(canvasWidth + 20);
                }
            }
        );
    };

    render() {
        const { _pipeWidth, _pipeInnerDistance } = this;
        const { x, y } = this.state;

        return (
            <Container>
                <Rect x={x} y={0} width={_pipeWidth} height={y} />
                <Rect
                    x={x}
                    y={y + _pipeInnerDistance}
                    width={_pipeWidth}
                    height={500}
                />
            </Container>
        );
    }
}

const PipeWithApp = withApp(Pipe);

export default PipeWithApp;
