import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {
        question_hi: { type: String },
        question_bn: { type: String },
        answer_hi: { type: String },
        answer_bn: { type: String },
    },
});

faqSchema.methods.getTranslatedText = function (lang) {
    return {
        question: this.translations[`question_${lang}`] || this.question,
        answer: this.translations[`answer_${lang}`] || this.answer,
    };
};

const FAQ = mongoose.model('FAQ', faqSchema);

export default FAQ;