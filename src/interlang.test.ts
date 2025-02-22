import Interlang from './interlang';

describe("Interlang", () => {
	const il = new Interlang()
	test('should throw if no language is set', () => {
		expect(() => il.t('greeting')).toThrow("No language selected or language not loaded")
	})

	test('should throw if no matching language is found', () => {
		expect(() => il.setLanguage('xx')).toThrow("Language xx not loaded")
	})

	test('should throw if key is not found', () => {
		il.setLanguage('en')
		expect(() => il.t("non-existent")).toThrow("Key non-existent missing in language en")
	})
	test('should load from all subfolders', () => {
		il.setLanguage('en')
		expect(() => il.t("test")).not.toThrow()
		expect(() => il.t("greeting")).not.toThrow()
	})

	test('should work with english', () => {
		il.setLanguage('en')
		expect(il.t("greeting")).toBe('Hello')
		expect(il.t("farewell")).toBe('Goodbye')
	})

	test('should work with dutch', () => {
		il.setLanguage('nl')
		expect(il.t("greeting")).toBe('Hallo')
		expect(il.t("farewell")).toBe('Doei')
	})
	test('should work with constructor parameter', () => {
		const el = new Interlang('nl');
		expect(el.t('greeting')).toBe('Hallo')
		expect(el.t('farewell')).toBe('Doei')
	})

})
