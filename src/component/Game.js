import React, { Component } from 'react';
import { Stage, Container, withApp } from 'react-pixi-fiber';
import Pipe from './Pipe';
import Land from './Land';
import Bird from './Bird';

const PIPE_COUNT = 2;

class Scene extends Component {
    componentDidMount() {
        const { app } = this.props;
        // app.ticker.add(this._updateBird);
    }

    componentWillMount() {
        const { app } = this.props;
        app.ticker.remove(this._updateBird);
    }

    _updateBird = () => {
        const { bird: birdState = {}, funcs } = this.props;

        funcs.updateAppState({
            key: 'bird',
            payload: {
                y: birdState.y - birdState.speedY,
                speedY: birdState.speedY - birdState.birdGravity,
            },
        });
    };

    renderPipes = () => {
        const {
            game: { canvasWidth, canvasHeight, gameSpeed },
            funcs,
        } = this.props;

        const nodes = [];
        for (let index = 0; index < PIPE_COUNT; index++) {
            const offset = (index * canvasWidth) / PIPE_COUNT;
            const pipeStartPos = canvasWidth + offset;

            nodes.push(
                <Pipe
                    key={index}
                    group={`pipeGroup${index}`}
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    gameSpeed={gameSpeed}
                    pipeStartPos={pipeStartPos}
                    funcs={funcs}
                />
            );
        }

        return nodes;
    };

    render() {
        const {
            game: { canvasWidth, canvasHeight, landHeight },
            bird,
        } = this.props;

        return (
            <Container>
                {canvasWidth ? this.renderPipes() : null}
                <Land
                    x={0}
                    y={canvasHeight - landHeight}
                    width={canvasWidth}
                    height={canvasHeight}
                />
                <Bird {...this.props.game} {...bird} />
            </Container>
        );
    }
}

const SceneWithApp = withApp(Scene);

class Game extends Component {
    flyUp = () => {
        const { bird: birdState = {}, funcs } = this.props;

        funcs.updateAppState({
            key: 'bird',
            payload: {
                speedY: birdState.birdFallSpeed,
            },
        });
    };

    render() {
        const stageOptions = {
            transparent: true,
        };

        const {
            game: { canvasWidth, canvasHeight },
        } = this.props;

        return (
            <Stage
                width={canvasWidth}
                height={canvasHeight}
                options={stageOptions}
                onTouchStart={this.flyUp}
            >
                <SceneWithApp {...this.props} />
            </Stage>
        );
    }
}

export default Game;
