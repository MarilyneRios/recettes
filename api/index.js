import express from 'express';
import dotenv from 'dotenv';
import connectDB from './configDb/db.js';

import userRoutes from './routes/userRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';

const app = express();


dotenv.config();
connectDB();

app.listen(3000, () => console.log(`Server listening on port 3000`));


app.use('/api/user', userRoutes);
app.use('/api/recipe', recipeRoutes);