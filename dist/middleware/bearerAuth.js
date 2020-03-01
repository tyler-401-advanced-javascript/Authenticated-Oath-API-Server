"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signjwt_1 = __importDefault(require("../util/signjwt"));
const users_1 = __importDefault(require("../models/users"));
const { SECRET } = process.env;
async function authorize(req, res, next) {
    if (!req.headers.authorization) {
        console.log('got here');
        next('no authorization headers');
    }
    else {
        const parsed = req.headers.authorization.split(' ').pop();
        try {
            const decoded = jsonwebtoken_1.default.verify(parsed, SECRET, { maxAge: '5m' });
            const user = await users_1.default.findOne({ username: decoded.username }).populate('role');
            if (user.username) {
                req.token = signjwt_1.default({ username: user.username, role: user.role });
                req.user = user;
                next();
            }
            else {
                next('that user doesnt exist');
            }
        }
        catch (err) {
            next(err.message);
        }
    }
}
exports.default = authorize;
//# sourceMappingURL=bearerAuth.js.map