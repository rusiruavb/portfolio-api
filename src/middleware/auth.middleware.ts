import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/user.model';
import log from '../log/index';

export default async function auth(req: Request, res: Response,  next: NextFunction): Promise<void> {
  try {
    const token = req.header('Authorization');
    const decode = jwt.verify(token as string, 'portfoliosecret');
    const user = await User.findOne({ _id: decode as string , 'token': token });

    if (!user) {
      log.error('User not autherized to the system');
      throw new Error('Please Authenticate to the API');
    }

    req.token = token;
    req.user = user;
    log.info('Token Accepted');
    next();
  } catch (error) {
    log.warn(error.message);
    res.status(401).send(error.message)
  }
}