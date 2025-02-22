import Interlang from './interlang';

test('Interlang translation', async () => {
	const il = new Interlang();
	await il.loadLanguageFiles(['./lang', './a/lang']);

	il.setLanguage('en');
	expect(il.t('greeting')).toBe('Hello');
	expect(il.t('farewell')).toBe('Goodbye');
	expect(il.t('test')).toBe('test')

	il.setLanguage('nl');
	expect(il.t('greeting')).toBe('Hallo');
	expect(il.t('farewell')).toBe('Doei');
	expect(il.t('test')).toBe('Hi test')

	expect(il.t('unknown')).toBe('unknown'); // Fallback to key
});

