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

// de.json
{
    "bye":"tschüss"
}
```
```js
import Interlang from "interlang";

const il = new Interlang();
await il.loadLanguageFiles(["./lang, ./module/lang/"]);
il.setLanguage("en");

console.log(il.t("hello")); // Hello, World
il.setLanguage("nl");
console.log(il.t("hello")); // Hallo, Wereld!
```

if a **key** is missing, the value of the key is printed:

```js
il.setLanguage('de')
console.log(il.t("hello")); // hello
```

# Todo:
* Add typing to `t()` after loading languages

