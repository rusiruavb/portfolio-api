import User, { UserDocument } from '../model/user.model';
import logger from '../log';
import bcrypt from 'bcrypt';

export const findByUsernameAndPassword = async (username: string, passowrd: string): Promise<UserDocument> => {
  const user = await User.findOne({ username });

  if (!user) {
    logger.error('There is no user in the database');
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(passowrd, user.password);

  if (!isMatch) {
    logger.error('Password is not matched');
    throw new Error('Password is not matched');
  }

  return user;
}
