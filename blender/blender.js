let blend = require('@mapbox/blend');

class Blender {

    width = 0;
    height = 0;
    images = [];

    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    AddImage(image) {
        var x = 0;
        this.images.map(i => {
            x += i.width;
        });
        image.x = x;
        image.y = 0;

        this.width = x + image.width;

        if (this.height < image.height) {
            this.height = image.height;
        }

        this.images.push(image);
    }

    async Blend() {
        return new Promise((resolve, reject) => {
            blend(this.images, {
                width: this.width,
                height: this.height,
                format: 'jpeg',
            }, (err, data) => {
                if(err) {
                    reject(err);
                }
                resolve(data);
            });
        })
    }
}

module.exports = { Blender };
