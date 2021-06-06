import { Request, Response, NextFunction } from 'express';
import { getPublicUserAccount } from '../src/controller/user.controller';

describe('Get public user account', () => {
  beforeEach(jest.clearAllMocks);
  const query = jest.fn();
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: Partial<NextFunction>;
  
  describe('getUserPublicProfile', () => {
    const getUserPublicProfileFunc = getPublicUserAccount(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction);

    test('200 - user', async () => {
      const expectedStatusCode = 200;
      const expectedResponse = {
        "_id": expect.any(String),
        "firstname": expect.any(String),
        "lastname": expect.any(String),
        "email": expect.any(String),
        "username": expect.any(String),
        "password": expect.any(String),
        "description": expect.any(String),
        "createdAt": expect.any(Date),
        "updatedAt": expect.any(Date),
        "__v": expect.any(Number),
        "token": expect.any(String)
      };

      it ('returns a user public profile', () => {
        const account = getUserPublicProfileFunc;
        account.then((data) => {
          console.log('data', data)
          
          expect(data).toEqual(expectedResponse);
        })
      })
    });
  })
})