import express, { Express, Request, Response, NextFunction } from 'express';
import config from 'config';
import log from './log'
import dbConnect from './db/database';
import routes from './routes';

const app: Express = express();
const PORT: Number = config.get('dev.port') as Number || config.get('production.port') as Number;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('<b>Rusiru Abhisheak Portfolio API</b>');
  next();
});

app.listen(PORT, () => {
  log.info(`API server up and running on PORT ${PORT}`);
  dbConnect();
  routes(app);
});