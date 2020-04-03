"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../models/users"));
const base_64_1 = __importDefault(require("base-64"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signjwt_1 = __importDefault(require("../util/signjwt"));
async function basicAuthorization(req, res, next) {
    if (!req.headers.authorization) {
        console.log('no authorization headers, basic');
        next(new Error('no authorization headers'));
    }
    else {
        const parsed = req.headers.authorization.split(' ').pop();
        const decoded = base_64_1.default.decode(parsed);
        let [username, password] = decoded.split(':');
        if (username.includes(' ')) {
            username = username.split(' ').pop();
        }
        console.log('username', username, 'password', password);
        const results = await users_1.default.find({ username }).populate('role');
        console.log(results);
        if (results.length === 0) {
            return res.status(406).json({ message: 'Bad Credentials' });
        }
        else {
            if (await bcrypt_1.default.compare(password, results[0].password)) {
                req.token = signjwt_1.default({ username: username, role: results[0].role });
                next();
            }
            else {
                next('you fucked up, bad credentials');
            }
        }
    }
}
exports.default = basicAuthorization;
//# sourceMappingURL=basicAuth.js.map