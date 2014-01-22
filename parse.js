var iniparser = require('iniparser'),
    fs = require('fs'),
    merge = require('merge'),
    root = '../tviplayer/webapp/php/lang/en-GB.ini',
    others = {
        'cy-gb': '../tviplayer/webapp/php/lang/cy-GB.ini',
        'ga-gb': '../tviplayer/webapp/php/lang/ga-GB.ini',
        'gd-gb': '../tviplayer/webapp/php/lang/gd-GB.ini'
    },
    locales = [];

var rootParsed = iniparser.parseSync(root);
var translations = { 
    root: {},
    'en-gb': true,
    'cy-gb': true,
    'ga-gb': true,
    'gd-gb': true
};
for (var group in rootParsed) {
    for (var translation in rootParsed[group]) {
        translations.root[translation] = rootParsed[group][translation];
    }
}
locales['en-gb'] = translations;
var jsonString = JSON.stringify(locales['en-gb']);
jsonString = jsonString.replace(/\\"/g, '');
fs.writeFile('./en-gb.js', 'define(' + jsonString + ')');

for (var key in others) {
    otherParsed = iniparser.parseSync(others[key]);
    translations = {};
    for (var group in otherParsed) {
        for (var translation in otherParsed[group]) {
            translations[translation] = otherParsed[group][translation];
        }
    }
    locales[key] = merge(true, locales['en-gb']['root'], translations);
    jsonString = JSON.stringify(locales[key]);
    jsonString = jsonString.replace(/\\"/g, '');
    fs.writeFile('./' + key + '.js', 'define(' + jsonString + ')');
}

return locales;
console.log(JSON.stringify(locales));
