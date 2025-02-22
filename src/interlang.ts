import * as fs from 'fs';
import * as path from 'path';

type LanguageData = { [key: string]: string }
type Languages = { [langCode: string]: LanguageData }
class Interlang {
	private languages: Languages = {};
	private currentLang: string | null = null;
	constructor() {
		this.languages = {};
		this.currentLang = null;
	}

	async loadLanguageFiles(langDirs: string[]) {
		for (const dir of langDirs) {
			const files = fs.readdirSync(dir);
			for (const file of files) {
				if (file.endsWith('.json')) {
					const langCode = path.basename(file, '.json');
					const filePath = path.join(dir, file);
					const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
					if (!this.languages[langCode]) {
						this.languages[langCode] = {};
					}
					Object.assign(this.languages[langCode], content);
				}
			}
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
		return this.languages[this.currentLang][key] || key;
	}
}

export default Interlang;

