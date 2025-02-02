import FAQ from '../models/faq.js';
import { translateText } from '../utils/translator.js';
import client from '../config/redis.js';

export const getFAQs = async (req, res) => {
    const lang = req.query.lang || 'en';
    try {
        const cacheKey = `faqs_${lang}`;
        const cachedData = await client.get(cacheKey);

        if (cachedData) {
            console.log('Serving from Redis cache');
            return res.json(JSON.parse(cachedData));
        }

        const faqs = await FAQ.find();

        const translatedFAQs = faqs.map(faq => faq.getTranslatedText(lang));

        await client.set(cacheKey, JSON.stringify(translatedFAQs));

        res.json(translatedFAQs);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ message: error.message });
    }
};

export const createFAQ = async (req, res) => {
    const { question, answer } = req.body;
    try {
        console.log('Translating question and answer...');
        const translations = {
            question_hi: await translateText(question, 'hi'),
            question_bn: await translateText(question, 'bn'),
            answer_hi: await translateText(answer, 'hi'),
            answer_bn: await translateText(answer, 'bn'),
        };
        console.log('Translations:', translations);
        const faq = new FAQ({ question, answer, translations });
        await faq.save();
        res.status(201).json(faq);
    } catch (error) {
        console.error('Error creating FAQ:', error);
        res.status(500).json({ message: error.message });
    }
};