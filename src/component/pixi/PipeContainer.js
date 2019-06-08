import { Container, Sprite } from 'pixi.js';
// utils';
import APP_SETTING from 'utils/appEnums';
const {
    gameSpeed,
    minPipeHeight,
    pipeWidth,
    pipeHeight,
    pipeHorizontalGap,
    pipeVerticalGap,
} = APP_SETTING;

class Pipe extends Sprite {
    constructor(texture, type) {
        super(texture);

        this.width = pipeWidth;
        this.height = pipeHeight;
        this.anchor.set(0.5);

        if (type === 'UP') {
            this.rotation = Math.PI;
        }
    }
}

export default class PipeContainer extends Container {
    pipes = [];

    constructor(pipeTexture, width, height) {
        super();
        this.pipeTexture = pipeTexture;
        this.width = width;
        this.height = height;

        // container offset
        this.position.x = width + pipeWidth / 2;

        // for calculate pipe use
        this._containerWidth = width;
        this._containerHeight = height;

        this._drawPipe();
    }

    movePipes = () => {
        this.pipes.forEach((el, index) => {
            const { upPipe, bottomPipe } = el;
            upPipe.position.x -= gameSpeed;
            bottomPipe.position.x -= gameSpeed;
        });

        this._addNewPipe();
        this._deletePipe();
    };

    _addNewPipe = () => {
        if (!this.pipes.length) return;

        const { upPipe } = this.pipes[this.pipes.length - 1];
        if (-upPipe.position.x >= pipeHorizontalGap) {
            this._drawPipe();
        }
    };

    _deletePipe = () => {
        if (!this.pipes.length) return;

        const firstPipeGroup = this.pipes[0];
        const { upPipe } = firstPipeGroup;
        if (upPipe.position.x + pipeWidth < -this._containerWidth) {
            this.pipes.shift();
        }
    };

    _drawPipe = () => {
        const pipeGroup = {};
        const upPipe = new Pipe(this.pipeTexture, 'UP');
        const bottomPipe = new Pipe(this.pipeTexture);

        const uperPos =
            pipeHeight / 2 - Math.random() * (pipeHeight - minPipeHeight);

        upPipe.position.y = uperPos;
        bottomPipe.position.y = uperPos + pipeHeight + pipeVerticalGap;

        upPipe.position.x = 0;
        bottomPipe.position.x = 0;

        pipeGroup.upPipe = upPipe;
        pipeGroup.bottomPipe = bottomPipe;

        this.addChild(upPipe);
        this.addChild(bottomPipe);
        this.pipes.push(pipeGroup);
    };
}
