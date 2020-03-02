"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const roles_1 = __importDefault(require("../../models/roles"));
const users_1 = __importDefault(require("../../models/users"));
const basicAuth_1 = __importDefault(require("../../middleware/basicAuth"));
const bearerAuth_1 = __importDefault(require("../../middleware/bearerAuth"));
const accessControlList_1 = __importDefault(require("../../middleware/accessControlList"));
const usersRouter = express_1.default.Router();
usersRouter.get('/users', (req, res, next) => {
    console.log(req.token);
    users_1.default.find({}).populate('role')
        .then(results => {
        res.status(200).json(results);
    })
        .catch(console.log);
});
usersRouter.post('/signup', async (req, res) => {
    const newUser = new users_1.default({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt_1.default.hash(req.body.password, 5),
        role: await roles_1.default.findOne({ name: req.body.role })
    });
    newUser.save()
        .then(results => {
        res.status(201).json({ token: newUser.generateToken() });
    })
        .catch(err => res.status(406).json({ error: err.message }));
});
usersRouter.post('/signin', basicAuth_1.default, (req, res, next) => {
    console.log(req.token);
    res.status(200).json({ token: req.token });
});
usersRouter.post('/users', bearerAuth_1.default, accessControlList_1.default('admin'), (req, res, next) => {
    res.status(201).send('hi!').json({ message: 'You successfully posted a user, not.', token: req.token });
});
usersRouter.put('/users', bearerAuth_1.default, accessControlList_1.default('admin'), (req, res, next) => {
    res.status(202).json({ message: 'You successfully updated a user, dummy route, you didnt actually. ', token: req.token });
});
usersRouter.delete('/users', bearerAuth_1.default, accessControlList_1.default('admin'), (req, res, next) => {
    res.status(202).json({ message: 'You successfully deleted a user, not.', token: req.token });
});
exports.default = usersRouter;
//# sourceMappingURL=users.js.map