const fs = require('fs');

fs.readFile('library/library.txt', 'utf8', function (keywordsError, keywords) {
    let obj = {};
    keywords = keywords.split(/\n/);
    for (let keyword of keywords) {
        const key = /^([^\s]+)\s/.exec(keyword)[0].replace(/\s/, '');
        const value = keyword.replace(key + ' ', '');
        obj[key] = value;
    }
    fs.writeFile('../src/inject/library.min.json', JSON.stringify(obj), function () {
        fs.readFile('src/inject/inject.js', 'utf8', function (jsError, js) {
            fs.readFile('src/inject/library.min.json', 'utf8', function (jsonError, json) {
                fs.writeFile(
                    'src/inject/inject.min.js',
                    js.replace('library = {}', 'library = ' + json),
                    'utf8',
                    function () {
                        console.log('Complete!');
                    });
            });
        });
    });
});