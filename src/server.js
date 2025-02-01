
import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;


//MongoDB connection
connectDB();


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});