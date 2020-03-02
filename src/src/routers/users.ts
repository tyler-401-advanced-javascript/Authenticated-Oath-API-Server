//core dependencies / libraries
import bcrypt from 'bcrypt';
import express from 'express';
import Role from '../../models/roles';
import User from '../../models/users';

//types
import { ITokenedRequest } from '../app';

//middleware
import basicAuth from '../../middleware/basicAuth'
import bearerAuth from '../../middleware/bearerAuth'
import acl from '../../middleware/accessControlList'


const usersRouter = express.Router();

//routes

//get all users from db.
//? public routes
usersRouter.get('/users', (req: ITokenedRequest, res, next) => {
  console.log(req.token);
  User.find({}).populate('role')
    .then(results => {
      res.status(200).json(results)
    })
    .catch(console.log)
})

usersRouter.post('/signup', async (req, res) => {
  //create instance of model with new user data. And save to DB
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 5),
    role: await Role.findOne({ name: req.body.role })
  })
  newUser.save()
    .then(results => {

      //issue a token in the response.
      res.status(201).json({ token: newUser.generateToken() })
    })
    .catch(err => res.status(406).json({ error: err.message }));
})

//? require basic auth
//authenticate a user's credentials with middleware. 
usersRouter.post('/signin', basicAuth, (req: ITokenedRequest, res, next) => {
  console.log(req.token)
  res.status(200).json({ token: req.token })
})


//? require bearer auth
usersRouter.post('/users', bearerAuth, acl('admin'), (req: ITokenedRequest, res, next) => {
  res.status(201).send('hi!').json({ message: 'You successfully posted a user, not.', token: req.token })
})

usersRouter.put('/users', bearerAuth, acl('admin'), (req: ITokenedRequest, res, next) => {
  res.status(202).json({ message: 'You successfully updated a user, dummy route, you didnt actually. ', token: req.token }) 
})

usersRouter.delete('/users', bearerAuth, acl('admin'), (req: ITokenedRequest, res, next) => {
  res.status(202).json({ message: 'You successfully deleted a user, not.', token: req.token }) 
})





export default usersRouter;