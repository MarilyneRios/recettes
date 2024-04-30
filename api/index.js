import express from 'express';
import dotenv from 'dotenv';
import connectDB from './configDb/db.js';
const app = express();


dotenv.config();
connectDB();

app.listen(3000, () => console.log(`Server listening on port 3000`));