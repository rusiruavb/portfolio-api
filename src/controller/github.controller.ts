import { Request, Response, NextFunction } from 'express';
import { updateGitHubUserProfile, updateGitHubUserRepositories, getGitHubUserProfile, getGitHubUserRepositories } from '../service/github.service';
import log from '../log/index';

async function updateGitHubProfile(req: Request, res: Response, next: NextFunction) {
  await updateGitHubUserProfile()
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

async function updateRepositories(req: Request, res: Response, next: NextFunction) {
  await updateGitHubUserRepositories()
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

async function getGitHubProfile(req: Request, res: Response, next: NextFunction) {
  await getGitHubUserProfile()
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

async function getGitHubRepositories(req: Request, res: Response, next: NextFunction) {
  await getGitHubUserRepositories()
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
  updateGitHubProfile,
  updateRepositories,
  getGitHubProfile,
  getGitHubRepositories
}