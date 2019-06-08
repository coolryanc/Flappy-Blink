import { Text, TextStyle } from 'pixi.js';

const defaultTextStyle = new TextStyle({
    fontSize: 36,
    fontWeight: 'bold',
    fill: '#ffffff',
    dropShadow: true,
    dropShadowColor: '#222',
    dropShadowAngle: Math.PI / 4,
    dropShadowDistance: 6,
});

export default class DisplayText extends Text {
    constructor(text, posX, posY, style) {
        super(text, style);

        this.anchor.set(0.5);
        this.x = posX;
        this.y = posY;

        if (!style) {
            this.style = defaultTextStyle;
        }
    }

    hideText = () => {
        this.alpha = 0;
    };

    showText = () => {
        this.alpha = 1;
    };
}
