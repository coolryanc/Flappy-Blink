import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const TYPE = 'LAND';
const LAND_COLOR = '0xDFD695';
const SURFACE_COLOR = '0x89ba16';

export const behavior = {
    customDisplayObject: props => new PIXI.Graphics(),
    customApplyProps: function(instance, props, nextProps) {
        const { fill, x, y, width, height, ...newPropsRest } = nextProps;
        const {
            fill: oldFill,
            x: oldX,
            y: oldY,
            width: oldWidth,
            height: oldHeight,
            ...oldPropsRest
        } = props;
        if (typeof props !== 'undefined') {
            instance.clear();
        }

        // draw land
        instance.beginFill(LAND_COLOR);
        instance.drawRect(x, y, width, height);
        instance.endFill();

        // draw surface
        instance.beginFill(SURFACE_COLOR);
        instance.drawRect(x, y, width, 25);
        instance.endFill();

        this.applyDisplayObjectProps(oldPropsRest, newPropsRest);
    },
};

export default CustomPIXIComponent(behavior, TYPE);
