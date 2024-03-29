import React, { PureComponent, Fragment } from 'react';
import * as PIXI from 'pixi.js';
import Bird from 'component/pixi/Bird';
import Ground from 'component/pixi/Ground';
import PipeContainer from 'component/pixi/PipeContainer';
import DisplayText from 'component/pixi/DisplayText';
import BlinkDetect from './BlinkDetect';
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
            transparent: true,
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

    componentWillUnmount() {
        this.pixiApp.ticker.remove(this._update);
    }

    _update = delta => {
        const { isStarted } = this.state;
        if (!isStarted) return;

        this.ground.tilePosition.x -= gameSpeed;
        this.bird.fall();
        this.pipeContainer.movePipes();

        if (this.bird.isDead) {
            this.gameTitle.showText();
            this.setState({
                isStarted: false,
            });
        }
    };

    gameStart = () => {
        const { isStarted } = this.state;
        if (!isStarted) {
            this.gameTitle.hideText();
            if (this.bird.isDead) {
                this.bird.init();
                this.pipeContainer.init();
            }
            this.setState({
                isStarted: true,
            });
        }
    };

    birdFly = () => {
        const { isStarted } = this.state;
        if (isStarted) {
            if (this.bird) {
                this.bird.fly();
            }
        }
    };

    render() {
        return (
            <Fragment>
                <BlinkDetect birdFly={this.birdFly} />
                <canvas
                    id="game"
                    ref={ref => (this.pixiCanvas = ref)}
                    onTouchStart={this.gameStart}
                    onClick={this.gameStart}
                />
            </Fragment>
        );
    }
}
