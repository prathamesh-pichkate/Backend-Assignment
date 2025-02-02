import client from '../config/redis.js';

export const cache = async (req, res, next) => {
    const lang = req.query.lang || 'en';
    console.log("Lang",lang);

    try {
        const data = await client.get(`faqs_${lang}`);
        console.log("Data",data);
        if (data) {
            console.log('✅ Serving from Redis cache');
            return res.send(JSON.parse(data));
        } else {
            console.warn('⚠️ Redis cache miss, fetching from MongoDB.');
            next();  // Skip caching if Redis is down
        }
    } catch (err) {
        console.error('Redis cache error:', err);
        next();
    }
};