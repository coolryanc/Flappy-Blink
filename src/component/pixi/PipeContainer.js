import { Container, Sprite } from 'pixi.js';
// utils';
import APP_SETTING from 'utils/appEnums';
const { minPipeHeight, pipeWidth, pipeHeight, pipeVerticalGap } = APP_SETTING;

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
    _PIPE_COUNT = 2;
    pipes = [];

    constructor(pipeTexture, width, height) {
        super();
        this.pipeTexture = pipeTexture;
        this.width = width;
        this.height = height;

        // for calculate pipe use
        this._containerWidth = width;
        this._containerHeight = height;

        // for(let index = 0; index < this._PIPE_COUNT; index++) {
        //     this.drawPipe();
        // }
        this.drawPipe();
    }

    drawPipe = () => {
        const pipe = {};
        const upPipe = new Pipe(this.pipeTexture, 'UP');
        const bottomPipe = new Pipe(this.pipeTexture);

        const uperPos =
            pipeHeight / 2 - Math.random() * (pipeHeight - minPipeHeight);

        upPipe.position.y = uperPos;
        bottomPipe.position.y = uperPos + pipeHeight + pipeVerticalGap;

        upPipe.position.x = 110;
        bottomPipe.position.x = 110;

        pipe.upper = bottomPipe.position.y + bottomPipe.height / 2;
        pipe.bottomPipe = pipe.upper + pipeVerticalGap;
        pipe.upPipe = upPipe;
        pipe.bottomPipe = bottomPipe;

        this.addChild(upPipe);
        this.addChild(bottomPipe);
        this.pipes.push(pipe);
    };
}
