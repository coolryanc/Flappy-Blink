import { AnimatedSprite } from 'pixi.js';
import APP_SETTING from 'utils/appEnums';

const {
    birdFallSpeed,
    birdHorizontalPosition,
    birdVerticalPosition,
    // birdGravity,
} = APP_SETTING;

export default class Bird extends AnimatedSprite {
    constructor(textures) {
        super(textures);

        this.animationSpeed = 0.2;
        this.anchor.set(0.5);
        this.scale.set(0.1);
        this.speedY = birdFallSpeed;

        this.init();
    }

    init = () => {
        this.play();
        this.rotation = 0;
        this.position.x = birdHorizontalPosition;
        this.position.y = birdVerticalPosition;
    };
}
