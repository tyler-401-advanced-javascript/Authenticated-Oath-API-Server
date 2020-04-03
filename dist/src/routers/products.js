"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bearerAuth_1 = __importDefault(require("../../middleware/bearerAuth"));
const accessControlList_1 = __importDefault(require("../../middleware/accessControlList"));
const products_1 = __importDefault(require("../../models/products"));
const productsRouter = express_1.default.Router();
productsRouter.get('/products', async (req, res, next) => {
    console.log('somebody got all products! ');
    const allProducts = await products_1.default.find({});
    res.status(200).json(allProducts);
});
productsRouter.post('/products', bearerAuth_1.default, accessControlList_1.default('admin'), async (req, res, next) => {
    const newProduct = new products_1.default(req.body);
    const createdProduct = await newProduct.save();
    res.status(201).json({ content: createdProduct, token: req.token });
});
productsRouter.put('/products/:id', bearerAuth_1.default, accessControlList_1.default('admin'), async (req, res, next) => {
    console.log('got to the route');
    const updatedProduct = await products_1.default.findOneAndUpdate(req.params.id, { stock: req.body.newStock });
    res.status(201).set('Access-Control-Allow-Method', 'PUT').json({ content: updatedProduct, token: req.token });
});
productsRouter.delete('/products', bearerAuth_1.default, accessControlList_1.default('admin'), async (req, res, next) => {
    const deleted = await products_1.default.deleteOne({ id: req.body.id });
    res.status(418).json({ content: 'im a teapot', deleted });
});
exports.default = productsRouter;
//# sourceMappingURL=products.js.map