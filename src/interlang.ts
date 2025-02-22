import * as fs from 'fs';
import * as path from 'path';

type LanguageData = { [key: string]: string }
type Languages = { [langCode: string]: LanguageData }
class Interlang {
	private languages: Languages = {};
	private currentLang: string | null = null;
	constructor(currentLang: string | null = null) {
		this.currentLang = currentLang;
		this.loadLanguageFiles()
	}

	loadLanguageFiles() {
		const findLangFiles = (dir: string) => {
			let langFiles: any = [];
			const items = fs.readdirSync(dir, { withFileTypes: true });

			for (const item of items) {
				const fullPath = path.join(dir, item.name);
				const isJsonLangFile = item.isFile() &&
					fullPath.includes(path.sep + 'lang' + path.sep) &&
					fullPath.endsWith('.json');

				if (isJsonLangFile) {
					langFiles.push(fullPath)
				} else if (item.isDirectory()) {
					langFiles = langFiles.concat(findLangFiles(fullPath));
				}
			}
			return langFiles;
		};

		const langFiles = findLangFiles(path.resolve(__dirname));

		for (const filePath of langFiles) {
			const langCode = path.basename(filePath, '.json');
			const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
			if (!this.languages[langCode]) {
				this.languages[langCode] = {};
			}
			Object.assign(this.languages[langCode], content);
		}
	}

	setLanguage(langCode: string): void {
		if (this.languages[langCode]) {
			this.currentLang = langCode;
		} else {
			throw new Error(`Language ${langCode} not loaded`);
		}
	}

	t(key: string) {
		if (!this.currentLang || !this.languages[this.currentLang]) {
			throw new Error('No language selected or language not loaded');
		}
		if (!this.languages[this.currentLang][key]) {
			throw new Error(`Key ${key} missing in language ${this.currentLang}`)
		}
		return this.languages[this.currentLang][key] || key;
	}
}

export default Interlang;

