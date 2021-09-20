let request = require('request');

async function FetchImage(greeting, width, height, colour, size) {
    let r =  {
        url: 'https://cataas.com/cat/says/' + greeting + '?width=' + width + '&height=' + height + '&color' + colour + '&s=' + size,
        encoding: 'binary'
    };

    return new Promise((resolve, reject) => {
        request.get(r, (err, res, body) => {
            if (err) {
                reject(err);
            }

            resolve({
                body: body,
                width: width,
                height: height
            });
        })
    })
}

module.exports = { FetchImage }
