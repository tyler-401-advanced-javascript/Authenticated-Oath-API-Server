import express from 'express';

//types
import { ITokenedRequest } from '../app';

//middlware
import bearerAuth from '../../middleware/bearerAuth'
import acl from '../../middleware/accessControlList'

//models
import Roles from '../../models/roles'

//instantiate router.
const rolesRouter = express.Router();


//routes
//? public
rolesRouter.get('/roles', async (req, res, next) => {
  const allRoles = await Roles.find({});
  res.status(200).json(allRoles)
})

//? bearer auth.
rolesRouter.post('/roles', bearerAuth, acl('admin'), async (req: ITokenedRequest, res, next) => {
  const newRole = new Roles(req.body);
  const createdRole = await newRole.save();
  res.status(201).json({message: createdRole, token: req.token});
})

rolesRouter.put('/roles', bearerAuth, acl('admin'), async (req: ITokenedRequest, res, next) => {
  const updatedRole = await Roles.updateOne({name: req.body.role}, {permissions: req.body.permissions});
  res.status(201).json({message: updatedRole, token: req.token});
})

rolesRouter.delete('/roles', bearerAuth, acl('admin'), async (req: ITokenedRequest, res, next) => {
  const deleted = await Roles.deleteOne({name: req.body.role})
  res.status(418).json({message: 'im a teapot', deleted})
})



export default rolesRouter;
