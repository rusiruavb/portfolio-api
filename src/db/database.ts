import mongoose from 'mongoose';
import config from 'config';
import log from '../log';

function connect() {
  const dbUri: string = config.get('dev.dbUri') as string || config.get('production.dbUri') as string;

  return mongoose.connect(dbUri, {
    useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  .then(() => {
    log.info('Database Synced');
  })
  .catch((error) => {
    log.error('Database Error: ', error.message);
    process.exit(1);
  });
}

export default connect;
