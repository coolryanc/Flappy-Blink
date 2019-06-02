import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Sprite, withApp } from 'react-pixi-fiber';
import { BIRD_FRAMES } from 'utils/assets';

class FlappyBird extends Component {
    constructor(props) {
        super(props);

        this.birdFrames = [];
        this.timer = null;
        this.state = {
            frame: 0,
        };
    }

    componentDidMount() {
        // Note that `app` prop is coming through `withApp` HoC
        const { app } = this.props;

        app.loader.add(BIRD_FRAMES).load((loader, resources) => {
            for (const key in resources) {
                this.birdFrames.push(resources[key].texture);
            }
            this.timer = setInterval(this._updateBirdFrames, 200);
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    _updateBirdFrames = () => {
        if (this.birdFrames.length) {
            this.setState(state => ({
                frame: state.frame + 1,
            }));
        }
    };

    render() {
        const { frame } = this.state;
        const textureIndex = parseInt(frame % this.birdFrames.length);
        const birdTexture = this.birdFrames[textureIndex];

        if (!birdTexture) {
            return null;
        }

        return (
            <Sprite
                {...this.props}
                texture={birdTexture}
                anchor={'0.5'}
                scale={'0.1'}
            />
        );
    }
}

FlappyBird.propTypes = {
    app: PropTypes.object.isRequired,
};

const FlappyBirdWithApp = withApp(FlappyBird);

export default FlappyBirdWithApp;
