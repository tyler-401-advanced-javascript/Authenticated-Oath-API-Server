"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bearerAuth_1 = __importDefault(require("../middleware/bearerAuth"));
const accessControlList_1 = __importDefault(require("../middleware/accessControlList"));
const chickens = [
    { name: 'chickety china', username: 'the chinese chicken' }
];
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.static('./dist/public'));
app.get('/chickens', bearerAuth_1.default, accessControlList_1.default('admin'), (req, res, next) => {
    res.status(200).json({ chickens, token: req.token });
});
const oauth_1 = __importDefault(require("./routers/oauth"));
app.use(oauth_1.default);
const users_1 = __importDefault(require("./routers/users"));
app.use(users_1.default);
const roles_1 = __importDefault(require("./routers/roles"));
app.use(roles_1.default);
const _500_1 = __importDefault(require("../middleware/500"));
app.use(_500_1.default);
const _404_1 = __importDefault(require("../middleware/404"));
app.use(_404_1.default);
exports.default = {
    app: app,
    start: (port) => {
        const PORT = port || 3001;
        app.listen(PORT, () => {
            console.log(`Listining on ${PORT}`);
        });
    }
};
//# sourceMappingURL=app.js.map