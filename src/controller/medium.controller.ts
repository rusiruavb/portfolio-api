import { Request, Response, NextFunction } from 'express';
import { getUserMediumPosts } from '../service/medium.service';
import logger from '../log/index';

export async function getMediumPosts(req: Request, res: Response) {
  await getUserMediumPosts()
  .then(data => {
    res.status(200).send(data)
  })
  .catch(error => {
    logger.error(error.message);
    res.status(409).send(error.message)
  });
}

