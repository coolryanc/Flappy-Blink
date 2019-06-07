import ASSETS from './assets';

export default function loadTexture(loader, assets) {
    const textures = {};

    for (const key in ASSETS) {
        const resource = ASSETS[key];
        if (typeof resource === 'object') {
            resource.forEach((el, index) => {
                loader.add(`${key}${index}`, el);
            });
        } else {
            loader.add(key, resource);
        }
    }

    return new Promise(resolve => {
        loader.load((loader, resources) => {
            for (const key in resources) {
                textures[key] = resources[key].texture;
            }
            resolve(textures);
        });
    });
}
