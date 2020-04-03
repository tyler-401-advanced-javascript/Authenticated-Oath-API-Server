"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { MONGODB_URI, PORT } = process.env;
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./src/app");
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose_1.default.connect(MONGODB_URI, mongooseOptions, () => {
    console.log('MongoDB up.');
});
app_1.startServer(PORT);
//# sourceMappingURL=index.js.map