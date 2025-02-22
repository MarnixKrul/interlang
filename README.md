# Interlang
An opiniated mini languagefile loader.
It's definitely not production ready.

## How to use.
create any json file with a locale abbreviation: `en.json`

create any `lang` folder.

```
/module/lang/
  en.json
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
import Interlang from "interlang";

const il = new Interlang();
await il.loadLanguages(["./lang, ./module/lang/"]);
il.setLanguage("en");

console.log(il.t("hello")); // Hello, World
```

# Todo:
[] Add typing to t after loading languages
