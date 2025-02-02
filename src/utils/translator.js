import { v2 as Translate } from '@google-cloud/translate';
import dotenv from 'dotenv';

dotenv.config();

const translate = new Translate.Translate({
    key: process.env.GOOGLE_TRANSLATE_API_KEY,
});

export const translateText = async (text, targetLang) => {
    try {
        const [translations] = await translate.translate(text, targetLang);
        return Array.isArray(translations) ? translations[0] : translations;
    } catch (error) {
        console.error('Translation error:', error);
        return text;
    }
};