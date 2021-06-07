import express, { Express, Request, Response, NextFunction } from 'express';
import log from './src/log'
import dbConnect from './src/db/database';
import routes from './src/routes';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config();
const app: Express = express();
const PORT: String = process.env.PORT as string;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('<b>Rusiru Abhisheak Portfolio API</b>');
  next();
});

setInterval(function() {
  https.get(process.env.API_PRODUCTION as string);
  log.info('Root service called');
}, 900000)

app.listen(PORT, () => {
  log.info(`API server up and running on PORT ${PORT}`);
  dbConnect();
  routes(app);
});