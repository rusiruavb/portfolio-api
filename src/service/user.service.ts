import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from '../model/user.model';
import logger from '../log';
import bcrypt from 'bcrypt';

export const checkUserByUsernameAndPassword = async (username: string, passowrd: string) => {
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

export const insertUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    const user = await User.create(input);
    const token = await user.generateAuthToken();
    logger.info('User created successfully');
    return user
  } catch (error) {
    logger.error(error.message);
    throw new Error(error);
  }
}

export const updateUserbyId = async (userId: string, userDetails: DocumentDefinition<UserDocument>) => {
  try {
    return await User.findByIdAndUpdate(userId, userDetails);
  } catch (error) {
    logger.error(error.message);
    throw new Error(error);
  }
}

export const getUserById = async (input: string) => {
  try {
    const user = await User.findById(input);

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    logger.error(error.message);
    throw new Error(error);
  }
}

export const getUserDetails = async () => {
  try {
    // need to populate user details with other collections
    return await User.find({}).limit(1);
  } catch (error) {
    logger.error(error.message);
    throw new Error(error);
  }
}