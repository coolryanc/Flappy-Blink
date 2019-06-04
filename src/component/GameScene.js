import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-pixi-fiber';
import Pipe from './Pipe';
import Land from './Land';
// context
import { AppContext } from 'context/provider';

const PIPE_COUNT = 2;

class GameScene extends Component {
    static contextType = AppContext;

    renderPipes = ({ width, height }) => {
        const nodes = [];
        for (let index = 0; index < PIPE_COUNT; index++) {
            const offset = (index * width) / PIPE_COUNT;
            const pipeStartPos = width + offset;

            nodes.push(
                <Pipe
                    key={index}
                    width={width}
                    height={height}
                    pipeStartPos={pipeStartPos}
                />
            );
        }

        return nodes;
    };

    render() {
        const { width, height } = this.props;
        const { game: gameState = {} } = this.context;
        const { landHeight } = gameState;

        return (
            <Container>
                {width ? this.renderPipes({ width, height }) : null}
                <Land
                    x={0}
                    y={height - landHeight}
                    width={width}
                    height={landHeight}
                />
            </Container>
        );
    }
}

GameScene.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default GameScene;
