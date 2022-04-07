import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import {UserDao} from '../daos/UserDao';
import { paramMissingError } from '../shared/constants';

const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export async function getAllUsers(req: Request, res: Response) {
  // eslint-disable-next-line
  const users = await userDao.getAllUsers();
  // eslint-disable-next-line
  return res.status(OK).json({users});
}

// export async function addOneUser(req: Request, res: Response) {
//   const user = req.body;
//   if (!user) {
//     return res.status(BAD_REQUEST).json({
//       error: paramMissingError,
//     });
//   }
//   await userDao.add(user);
//   return res.status(CREATED).end();
// }
//
// export async function updateOneUser(req: Request, res: Response) {
//   const { user } = req.body;
//   if (!user) {
//     return res.status(BAD_REQUEST).json({
//       error: paramMissingError,
//     });
//   }
//   user.id = Number(user.id);
//   await userDao.update(user);
//   return res.status(OK).end();
// }
//
// export async function deleteOneUser(req: Request, res: Response) {
//   const { id } = req.params;
//   await userDao.delete(Number(id));
//   return res.status(OK).end();
// }
