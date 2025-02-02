import * as chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import FAQ from '../src/models/faq.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('FAQ API', () => {
    beforeEach(async () => {
        await FAQ.deleteMany({});
    });

    describe('GET /api/faqs', () => {
        it('should fetch all FAQs in English', async () => {
            await FAQ.create([
                { question: 'Test Question 1', answer: 'Test Answer 1' },
                { question: 'Test Question 2', answer: 'Test Answer 2' },
            ]);

            const res = await chai.request(app).get('/api/faqs').query({ lang: 'en' });
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(2);
        });

        it('should fetch FAQs in Hindi', async () => {
            const faq = await FAQ.create({
                question: 'Test Question',
                answer: 'Test Answer',
                translations: {
                    hi: { question: 'प्रश्न', answer: 'उत्तर' },
                },
            });

            const res = await chai.request(app).get('/api/faqs').query({ lang: 'hi' });
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0].question).to.equal('प्रश्न');
            expect(res.body[0].answer).to.equal('उत्तर');
        });

        it('should fetch FAQs in Bengali', async () => {
            const faq = await FAQ.create({
                question: 'Test Question',
                answer: 'Test Answer',
                translations: {
                    bn: { question: 'প্রশ্ন', answer: 'উত্তর' },
                },
            });

            const res = await chai.request(app).get('/api/faqs').query({ lang: 'bn' });
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0].question).to.equal('প্রশ্ন');
            expect(res.body[0].answer).to.equal('উত্তর');
        });
    });

    describe('POST /api/faqs', () => {
        it('should create a new FAQ', async () => {
            const newFAQ = {
                question: 'Test Question',
                answer: 'Test Answer',
            };

            const res = await chai.request(app).post('/api/faqs').send(newFAQ);
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('question', newFAQ.question);
            expect(res.body).to.have.property('answer', newFAQ.answer);
        });

        it('should return 400 if question or answer is missing', async () => {
            const res = await chai.request(app).post('/api/faqs').send({});
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('errors');
        });
    });
});