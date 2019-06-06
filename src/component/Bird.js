import React, { Component } from 'react';
import { withApp, CustomPIXIComponent } from 'react-pixi-fiber';
import { BIRD_FRAMES } from 'utils/assets';
import * as PIXI from 'pixi.js';

// ANIMATED component
const TYPE = 'ANIMATED';
const behavior = {
    customDisplayObject: props => new PIXI.AnimatedSprite(props.textures),
    customApplyProps: function(instance, props, nextProps) {
        const { x, y, rotation } = nextProps;

        instance.animationSpeed = 0.2;
        instance.anchor.set(0.5);
        instance.scale.set(0.1);
        instance.position.x = x;
        instance.position.y = y;
        instance.rotation = rotation;
        instance.play();
    },
};
const Animated = CustomPIXIComponent(behavior, TYPE);

class FlappyBird extends Component {
    constructor(props) {
        super(props);

        this.state = {
            birdFrames: [],
        };
    }

    componentDidMount() {
        // Note that `app` prop is coming through `withApp` HoC
        const { app } = this.props;

        app.loader.add(BIRD_FRAMES).load((loader, resources) => {
            const frames = [];
            for (const key in resources) {
                frames.push(resources[key].texture);
            }
            this.setState({
                birdFrames: frames,
            });
        });
    }

    render() {
        const { x, y, rotation } = this.props;
        const { birdFrames } = this.state;

        if (!birdFrames.length) {
            return null;
        }

        return (
            <Animated x={x} y={y} textures={birdFrames} rotation={rotation} />
        );
    }
}

const FlappyBirdWithApp = withApp(FlappyBird);

export default FlappyBirdWithApp;
