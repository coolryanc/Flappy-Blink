import React, { Component } from 'react';
import { Sprite, withApp } from 'react-pixi-fiber';
import bird from 'assets/bird.gif';
import * as PIXI from 'pixi.js';
import PropTypes from 'prop-types';

class RotatingBird extends Component {
    state = {
        rotation: 0,
    };

    componentDidMount() {
        // Note that `app` prop is coming through `withApp` HoC
        this.props.app.ticker.add(this.animate);
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.animate);
    }

    animate = delta => {
        this.setState(state => ({
            rotation: state.rotation + 0.1 * delta,
        }));
    };

    render() {
        return (
            <Sprite
                {...this.props}
                texture={PIXI.Texture.from(bird)}
                rotation={this.state.rotation}
            />
        );
    }
}

RotatingBird.propTypes = {
    app: PropTypes.object.isRequired,
};

const RotatingBirdWithApp = withApp(RotatingBird);

export default RotatingBirdWithApp;
