import express from 'express';
import User from '../models/users'
import base64 from 'base-64';
import bcrypt from 'bcrypt';

import { ITokenedRequest } from '../src/app';

import jwtsign from '../util/signjwt'


//todo: outsource the DB operations to the users model.
export default async function basicAuthorization(req: ITokenedRequest, res: express.Response, next: any) {
  if (!req.headers.authorization) {
    console.log('no authorization headers, basic');
    next(new Error('no authorization headers'))
  } else {
//oh yes
    const parsed = req.headers.authorization.split(' ').pop();
    const decoded = base64.decode(parsed);

    let [username, password] = decoded.split(':')

    if(username.includes(' ')) {
      username = username.split(' ').pop();
    }
    console.log('username', username, 'password', password)

    // User.test() // WORKS!
    
    //find that user by username inside the db })
    const results = await User.find({ username }).populate('role');
    console.log(results);
    if (results.length === 0) {
      return res.status(406).json({ message: 'Bad Credentials' })
    } else {


      // if credentials are good, set token on req.
      if (await bcrypt.compare(password, results[0].password)) {
        req.token = jwtsign({ username: username, role: results[0].role }); 
        next();
      } else {
        next('you fucked up, bad credentials');
      }
    }
  }
}