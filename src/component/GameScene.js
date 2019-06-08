import React, { PureComponent } from 'react';
import * as PIXI from 'pixi.js';
import Bird from 'component/pixi/Bird';
import Ground from 'component/pixi/Ground';
import PipeContainer from 'component/pixi/PipeContainer';
// utils
import loadTexture from 'utils/loadTexture';
import APP_SETTING from 'utils/appEnums';

const { gameSpeed } = APP_SETTING;

export default class GameScene extends PureComponent {
    pixiApp = null;
    pixiCanvas = null;
    bird = null;
    ground = null;

    async componentDidMount() {
        const { width, height } = this.props;
        this.pixiApp = new PIXI.Application({
            width,
            height,
            backgroundColor: '0x1099bb',
            view: this.pixiCanvas,
        });

        const textures = await loadTexture(this.pixiApp.loader);

        this.bird = new Bird([
            textures.BIRD0,
            textures.BIRD1,
            textures.BIRD2,
            textures.BIRD3,
        ]);
        this.ground = new Ground(textures.GROUND, width, height);
        this.pipeContainer = new PipeContainer(textures.PIPE, width, height);

        [this.pipeContainer, this.ground, this.bird].map(child =>
            this.pixiApp.stage.addChild(child)
        );

        this.pixiApp.ticker.add(this._update);
    }

    _update = delta => {
        this.ground.tilePosition.x -= gameSpeed;
        this.pipeContainer.movePipes();
    };

    render() {
        return <canvas id="game" ref={ref => (this.pixiCanvas = ref)} />;
    }
}
