"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true, select: true },
    password: { type: String, required: true, select: true },
    role: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Role' }
});
const Model = mongoose_1.default.model('users', usersSchema);
Model.prototype.generateToken = function () {
    const tokenData = {
        username: this.username,
        email: this.email,
        permissions: this.role.permissions || []
    };
    return jsonwebtoken_1.default.sign(tokenData, process.env.SECRET);
};
Model.test = () => {
    console.log("TEST!");
};
exports.default = Model;
//# sourceMappingURL=users.js.map