import { TilingSprite } from 'pixi.js';
import APP_SETTING from 'utils/appEnums';

const { groundHeight } = APP_SETTING;

export default class Ground extends TilingSprite {
    constructor(textures, width, height) {
        super(textures, width, groundHeight);

        this.position.x = 0;
        this.position.y = height - groundHeight;
    }
}
