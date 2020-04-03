"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bearerAuth_1 = __importDefault(require("../../middleware/bearerAuth"));
const accessControlList_1 = __importDefault(require("../../middleware/accessControlList"));
const roles_1 = __importDefault(require("../../models/roles"));
const rolesRouter = express_1.default.Router();
rolesRouter.get('/roles', async (req, res, next) => {
    const allRoles = await roles_1.default.find({});
    res.status(200).json(allRoles);
});
rolesRouter.post('/roles', bearerAuth_1.default, accessControlList_1.default('admin'), async (req, res, next) => {
    const newRole = new roles_1.default(req.body);
    const createdRole = await newRole.save();
    res.status(201).json({ message: createdRole, token: req.token });
});
rolesRouter.put('/roles', bearerAuth_1.default, accessControlList_1.default('admin'), async (req, res, next) => {
    const updatedRole = await roles_1.default.updateOne({ name: req.body.role }, { permissions: req.body.permissions });
    res.status(201).json({ message: updatedRole, token: req.token });
});
rolesRouter.delete('/roles', bearerAuth_1.default, accessControlList_1.default('admin'), async (req, res, next) => {
    const deleted = await roles_1.default.deleteOne({ name: req.body.role });
    res.status(418).json({ message: 'im a teapot', deleted });
});
exports.default = rolesRouter;
//# sourceMappingURL=roles.js.map