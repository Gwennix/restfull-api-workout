import express from 'express';
import dotenv from 'dotenv';
import workoutRoutes from './routes/workoutRoutes.js'
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json())

app.use('/api/workouts', workoutRoutes)


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('De server draait op poort 4000', process.env.PORT, 'and database');
    });
  })
  .catch((error) => {
    console.log(error);
  });