import { AnimatedSprite } from 'pixi.js';
import APP_SETTING from 'utils/appEnums';

const {
    birdFallSpeed,
    birdHorizontalPosition,
    birdVerticalPosition,
    birdGravity,
} = APP_SETTING;

export default class Bird extends AnimatedSprite {
    isDead = false;

    constructor(textures, height) {
        super(textures);

        this.animationSpeed = 0.2;
        this.anchor.set(0.5);
        this.scale.set(0.1);
        this.speedY = birdFallSpeed;
        this._flyArea = height;

        this.init();
    }

    init = () => {
        this.play();
        this.rotation = 0;
        this.isDead = false;
        this.position.x = birdHorizontalPosition;
        this.position.y = birdVerticalPosition;
    };

    fall = () => {
        this.position.y -= this.speedY;
        this.speedY -= birdGravity;

        if (
            this.position.y < this.height / 2 ||
            this.position.y > this._flyArea - this.height / 2
        ) {
            this.isDead = true;
        }
    };

    fly = () => {
        this.speedY = birdFallSpeed;
    };
}
