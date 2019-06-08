import React, { PureComponent } from 'react';
import * as PIXI from 'pixi.js';
import Bird from 'component/pixi/Bird';
import Ground from 'component/pixi/Ground';
import PipeContainer from 'component/pixi/PipeContainer';
import DisplayText from 'component/pixi/DisplayText';
// utils
import loadTexture from 'utils/loadTexture';
import APP_SETTING from 'utils/appEnums';

const { gameSpeed } = APP_SETTING;

export default class GameScene extends PureComponent {
    pixiApp = null;
    pixiCanvas = null;
    bird = null;
    ground = null;

    state = {
        isStarted: false,
    };

    async componentDidMount() {
        const { width, height } = this.props;
        this.pixiApp = new PIXI.Application({
            width,
            height,
            backgroundColor: '0x1099bb',
            view: this.pixiCanvas,
        });

        const textures = await loadTexture(this.pixiApp.loader);

        this.bird = new Bird(
            [textures.BIRD0, textures.BIRD1, textures.BIRD2, textures.BIRD3],
            height
        );
        this.ground = new Ground(textures.GROUND, width, height);
        this.pipeContainer = new PipeContainer(textures.PIPE, width, height);
        this.gameTitle = new DisplayText('Tap to start', width / 2, height / 2);

        [this.pipeContainer, this.ground, this.bird, this.gameTitle].map(
            child => this.pixiApp.stage.addChild(child)
        );

        this.pixiApp.ticker.add(this._update);
    }

    _update = delta => {
        const { isStarted } = this.state;
        if (isStarted) {
            this.ground.tilePosition.x -= gameSpeed;
            this.bird.fall();
            this.pipeContainer.movePipes();
        }
    };

    birdFly = () => {
        const { isStarted } = this.state;
        if (isStarted) {
            if (this.bird) {
                this.bird.fly();
            }
        } else {
            this.gameTitle.hideText();
            this.setState({
                isStarted: true,
            });
        }
    };

    render() {
        return (
            <canvas
                id="game"
                ref={ref => (this.pixiCanvas = ref)}
                onTouchStart={this.birdFly}
            />
        );
    }
}
