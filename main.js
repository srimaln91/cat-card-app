let argv = require('minimist')(process.argv.slice(2));
let { Blender } = require("./blender/blender")
let { FetchImage } = require("./fetcher/fetcher")
let { WriteFile } = require("./writer/writer")
let { join } = require('path');

const path = join(process.cwd(), `/cat-card.jpg`);

let {
    greeting = 'Hello',
    who = 'You',
    width = 400,
    height = 500,
    color = 'Pink',
    size = 100,
} = argv;

image1 = FetchImage(greeting, width, height, color, size);
image2 = FetchImage(who, width, height, color, size);

let blender = new Blender(0, 0)

Promise.all([image1, image2])
    .then((results => {

        results.map(res => {
            blender.AddImage({
                buffer: new Buffer.from(res.body, 'binary'),
                width: res.width,
                height: res.height
            });
        });

        blender.Blend().then(newImage => {
            WriteFile(path, newImage).catch(console.error);
        }).catch(console.error)
    })).catch(console.error)
