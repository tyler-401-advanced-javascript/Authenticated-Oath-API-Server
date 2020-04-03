import express from 'express'
import { ITokenedRequest } from '../../src/src/app';
import jwt from 'jsonwebtoken'
import jwtsign from '../util/signjwt'
import User from '../models/users';

const { SECRET } = process.env;

export default async function authorize(req: ITokenedRequest, res: express.Response, next: any) {
  if (!req.headers.authorization) {
    console.log('got here');
    next('no authorization headers')
  } else {
    //1. parse the auth header from req obj
    const parsed = req.headers.authorization.split(' ').pop();
    try {
      //2. decode and verify that the token is not expired 
      const decoded = jwt.verify(parsed, SECRET) as any; // return obj is typed any.

      //3. see if the user exists
      const user = await User.findOne({ username: decoded.username }).populate('role');

      //4.  all the checks check out, then they have an account. Add their user to the req, and sign an new token for them.
      if (user.username) {
        req.token = jwtsign({username: user.username, role: user.role})
        req.user = user;
        next();
      } else {
        next('that user doesnt exist')
      }
    } catch (err) {
      next(err.message)
    }
  }
}

