let { writeFile } = require('fs');

function WriteFile(path, data) {
    return new Promise((resolve, reject) => {
        writeFile(path, data, 'binary', (err) => {
            if (err) {
                reject(err);
            }
            resolve()
        })
    })
}

module.exports = { WriteFile }
