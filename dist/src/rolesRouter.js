"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roles_1 = __importDefault(require("../models/roles"));
const rolesRouter = express_1.default.Router();
rolesRouter.get('/roles', async (req, res, next) => {
    const allRoles = await roles_1.default.find({});
    res.status(200).json(allRoles);
});
rolesRouter.post('/roles', async (req, res, next) => {
    const newRole = new roles_1.default(req.body);
    const createdRole = await newRole.save();
    res.status(201).json(createdRole);
});
exports.default = rolesRouter;
//# sourceMappingURL=rolesRouter.js.map