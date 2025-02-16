var text = {
    'en': {
        hello: 'Hello'
    },
    'nl': {
        hello: 'Hallo'
    }
};
var t = function (locale, key) {
    if (!key) {
        return t[locale];
    }
    return text[locale][key];
};
var main = function () {
    var english = t('en');
    var dutch = t('nl');
    console.log(t('en', 'hello'));
    console.log(t('nl', 'hello'));
};
