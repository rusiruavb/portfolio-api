import { Request, Response, NextFunction } from 'express';
import { insertUser, getUserById, getUserDetails, updateUserbyId, checkUserByUsernameAndPassword } from '../service/user.service';
import log from '../log/index';
import { omit } from 'lodash';

async function createUser(req: Request, res: Response, next: NextFunction) {
  await insertUser(req.body)
  .then(data => {
    res.status(200).send(data);
    next();
  })
  .catch(error => {
    log.error(error.message);
    res.status(409).send(error.message);
    next();
  });
}

async function loginUser(req: Request, res: Response, next: NextFunction) {
  await checkUserByUsernameAndPassword(req.body.username, req.body.password)
  .then(data => {
    res.status(200).send(omit(data.toJSON(), 'password'));
    next();
  })
  .catch(error => {
    log.error(error.message);
    res.status(409).send(error.message);
    next();
  });
}

async function getUserAccount(req: Request, res: Response, next: NextFunction) {
  await getUserById(req.body.id)
  .then(data => {
    res.status(200).send(omit(data.toJSON(), 'password'));
    next();
  })
  .catch(error => {
    log.error(error.message);
    res.status(409).send(error.message);
    next();
  });
}

async function getPublicUserAccount(req: Request, res: Response, next: NextFunction) {
  await getUserDetails()
  .then(data => {
    res.status(200).send(data);
    next();
  })
  .catch(error => {
    log.error(error.message);
    res.status(409).send(error.message);
    next();
  });
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  await updateUserbyId(req.body.id, req.body)
  .then(data => {
    res.status(200).send(data);
    next();
  })
  .catch(error => {
    log.error(error.message);
    res.status(409).send(error.message);
    next();
  });
}

export {
  createUser,
  loginUser,
  getUserAccount,
  getPublicUserAccount,
  updateUser
};