import { existsSync } from 'fs'
type Locale = 'en' | 'nl' | 'de'
const DEFAULT = 'nl'
const FOLDER = 'lang'

let LOCALE_TEXT = {}

const t = (key: any) => {
	return LOCALE_TEXT[key]

}
const loadLocaleText = async (locale: Locale) => {
	const path = `./${FOLDER}/${locale}.json`
	if (existsSync(path)) {
		LOCALE_TEXT = await import(path)
	} else if (existsSync(`./${FOLDER}`)) {
		if (!existsSync(`./${FOLDER}/${DEFAULT}.json`)) {
			throw new Error(`Folder exists, missing default & locale`)
		}
		throw new Error(`Folder exists, but missing locale: ${locale} `)
	}
	LOCALE_TEXT = await import(`./${FOLDER}/${DEFAULT}.json`)
}



const main = async () => {
	await loadLocaleText('en')
	const hello = t('hello')
	console.log('hello', hello)
	await loadLocaleText('nl')
	const text = t('hello')
	console.log(text)

}
main()
