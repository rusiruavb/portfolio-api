import mongoose from 'mongoose';
import log from '../log';

function connect() {
  const dbUri: string = process.env.MONGODB_URI as string;

  return mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
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
