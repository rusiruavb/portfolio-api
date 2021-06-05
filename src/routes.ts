import { Express } from "express";
import { createUser, loginUser, getUserAccount, getPublicUserAccount, updateUser} from './controller/user.controller';

export default function (app: Express) {
  app.post('/user/create', createUser);
  app.post('/user/login', loginUser);
  app.get('/user/', getUserAccount);
  app.get('/user/public', getPublicUserAccount);
  app.put('/user/update', updateUser)
}