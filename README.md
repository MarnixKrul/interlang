# Interlang
An opiniated mini languagefile loader.
It's definitely not production ready.

## How to use.
create any json file with a locale abbreviation: `en.json`
create any `lang` folder.

```
/lang/
  en.json
  de.json
  nl.json
```

Add the variables to those json files
```json
// en.json
{
    "hello": "Hello, World"
}


// nl.json
{
    "hello": "Hallo, Wereld!"
}
```
```js
import loadLangText from 'interlang'

loadLangText('nl')
t('hello') // Hallo, Wereld!
```

## Todo:
1. Load all lang folders language files
    The project should check all language folders and load the texts once

1. Export loadLangText
1. Support all languages

