const fs = require('fs');

fs.readFile('library.txt', 'utf8', function (err, keywords) {
    let obj = {};
    keywords = keywords.split(/\n/);
    for (let keyword of keywords) {
        const key = /^([^\s]+)\s/.exec(keyword)[0].replace(/\s/, '');
        const value = keyword.replace(key + ' ', '');
        console.log(keyword, key, value);
        obj[key] = value;
    }
    fs.writeFile('../src/inject/library.min.json', JSON.stringify(obj), function (err) {
        if (err) {
            return console.log(err);
        } else {
            console.log('The file was saved!');
        }
    });
});