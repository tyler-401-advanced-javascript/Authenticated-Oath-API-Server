import express from 'express';

//types
import { ITokenedRequest } from '../app';

//middlware
import bearerAuth from '../../middleware/bearerAuth'
import acl from '../../middleware/accessControlList'

//models
import Products from '../../models/products'

//instantiate router.
const productsRouter = express.Router();


//routes
//? public
productsRouter.get('/products', async (req, res, next) => { 
  console.log('somebody got all products! ');
  const allProducts = await Products.find({});
  res.status(200).json(allProducts)
})

//? bearer auth.
productsRouter.post('/products', bearerAuth, acl('admin'), async (req: ITokenedRequest, res, next) => {
  const newProduct = new Products(req.body);
  const createdProduct = await newProduct.save();
  res.status(201).json({content: createdProduct, token: req.token});
})

productsRouter.put('/products/:id', bearerAuth, acl('admin'), async (req: ITokenedRequest, res, next) => {
  console.log('got to the route')
  const updatedProduct = await Products.findOneAndUpdate(req.params.id, {stock: req.body.newStock});
  res.status(201).set('Access-Control-Allow-Method', 'PUT').json({content: updatedProduct, token: req.token});
})

productsRouter.delete('/products', bearerAuth, acl('admin'), async (req: ITokenedRequest, res, next) => {
  const deleted = await Products.deleteOne({id: req.body.id})
  res.status(418).json({content: 'im a teapot', deleted})
})



export default productsRouter;
