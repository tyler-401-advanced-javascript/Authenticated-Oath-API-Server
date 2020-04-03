"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bearerAuth_1 = __importDefault(require("../middleware/bearerAuth"));
const accessControlList_1 = __importDefault(require("../middleware/accessControlList"));
const cors_1 = __importDefault(require("cors"));
const chickens = [
    { name: 'chickety china', username: 'the chinese chicken' }
];
exports.app = express_1.default();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.static('./dist/public'));
exports.app.use(cors_1.default({
    methods: 'GET,HEAD,OPTIONS,PUT,DELETE,POST',
    origin: '*'
}));
exports.app.get('/chickens', bearerAuth_1.default, accessControlList_1.default('admin'), (req, res, next) => {
    res.status(200).json({ chickens, token: req.token });
});
const oauth_1 = __importDefault(require("./routers/oauth"));
exports.app.use(oauth_1.default);
const users_1 = __importDefault(require("./routers/users"));
exports.app.use(users_1.default);
const roles_1 = __importDefault(require("./routers/roles"));
exports.app.use(roles_1.default);
const products_1 = __importDefault(require("./routers/products"));
exports.app.use(products_1.default);
const _500_1 = __importDefault(require("../middleware/500"));
exports.app.use(_500_1.default);
const _404_1 = __importDefault(require("../middleware/404"));
exports.app.use(_404_1.default);
exports.startServer = async (port) => {
    const PORT = port || 3001;
    const listening = await exports.app.listen(PORT);
    console.log(`Listening on ${PORT}`);
    return listening;
};
//# sourceMappingURL=app.js.map