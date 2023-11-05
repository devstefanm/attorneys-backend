import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import lawyersRoutes from './routes/lawyers';
import clientsRoutes from './routes/clients';
import courtsRoutes from './routes/courts';
import executorsRoutes from './routes/executors';
import employersRoutes from './routes/employers';
import casesRoutes from './routes/cases';
import transactionsRoutes from './routes/transactions';
import packagesRoutes from './routes/packages';
import ssnRoutes from './routes/ssnNumbers';
import citiesRoutes from './routes/cities';
import { runMigrations } from 'attorneys-db';

const PORT = process.env.PORT || 5000;

const app = express();
const corsOptions = { credentials: true, origin: '*' };

// Middleware
app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/api', [
  casesRoutes,
  citiesRoutes,
  clientsRoutes,
  courtsRoutes,
  employersRoutes,
  executorsRoutes,
  lawyersRoutes,
  packagesRoutes,
  ssnRoutes,
  transactionsRoutes,
]);

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
  // runMigrations();
});
