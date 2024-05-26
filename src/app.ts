import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', bookRoutes);

export default app;
