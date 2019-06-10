const CanvasFilters = {
    getCanvas: function(w, h) {
        let c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        return c;
    },

    getPixels: function(img) {
        let c = this.getCanvas(img.width, img.height);
        let ctx = c.getContext('2d');
        ctx.drawImage(img);
        return ctx.getImageData(0, 0, c.width, c.height);
    },

    getBrightness: function(pixels) {
        const d = pixels.data;
        let colorSum = 0;

        for (let i = 0; i < d.length; i += 4) {
            const r = d[i + 0];
            const g = d[i + 1];
            const b = d[i + 2];

            const avg = Math.floor((r + g + b) / 3);
            colorSum += avg;
        }

        return colorSum / 4800;
    },

    grayscale: function(pixels, contrast, brightness) {
        const d = pixels.data;
        for (let i = 0; i < d.length; i += 4) {
            const r = d[i + 0];
            const g = d[i + 1];
            const b = d[i + 2];
            const a = d[i + 3];
            let v = 0.2126 * r + 0.7152 * g + 0.0722 * b;

            if (contrast && brightness) {
                v /= a;

                // Apply contrast.
                v = (v - 0.5) * Math.max(contrast, 0) + 0.5;

                // Apply brightness.
                v += brightness;

                // Return final pixel color.
                v *= a;
            }

            d[i + 0] = d[i + 1] = d[i + 2] = v;
        }
        return pixels;
    },

    threshold: function(pixels, threshold) {
        const d = pixels.data;
        let white = 0;
        for (let i = 0; i < d.length; i += 4) {
            const r = d[i + 0];
            const g = d[i + 1];
            const b = d[i + 2];
            let v = 0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold ? 255 : 0; // o black
            if (i < 9600 && v) {
                white += 1;
            }
            d[i + 0] = d[i + 1] = d[i + 2] = v;
        }
        return { pixels, white };
    },
};

export default CanvasFilters;
