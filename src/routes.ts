import { Express } from "express";
import { createUser, loginUser, getUserAccount, getPublicUserAccount, updateUser, getMediumPosts } from './controller/user.controller';
import { updateGitHubProfile, updateRepositories, getGitHubProfile, getGitHubRepositories } from './controller/github.controller';
import auth from './middleware/auth.middleware';

export default function (app: Express) {
  app.post('/user/create', createUser);
  app.post('/user/login', loginUser);
  app.get('/user/', auth, getUserAccount);
  app.get('/user/public', getPublicUserAccount);
  app.put('/user/update', auth, updateUser);
  app.put('/user/github/profile/update', auth, updateGitHubProfile);
  app.put('/user/github/repos/update', auth, updateRepositories);
  app.get('/user/github/profile', getGitHubProfile);
  app.get('/user/github/repos', getGitHubRepositories);
  app.get('/user/medium', getMediumPosts)
}