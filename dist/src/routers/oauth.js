"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleOauth_1 = __importDefault(require("../../middleware/handleOauth"));
const oauthRouter = express_1.default.Router();
oauthRouter.get('/oauth-fb', (req, res, next) => {
    const URL = 'https://www.facebook.com/v6.0/dialog/oauth?';
    const options = {
        client_id: process.env.FB_CLIENT_ID,
        redirect_uri: process.env.LOCAL_OAUTH_ROUTE,
        state: process.env.OAUTH_SECRET,
        response_type: 'code'
    };
    let queryString = Object.keys(options).map(key => {
        return `${key}=${options[key]}`;
    }).join('&');
    console.log('token query string: ', queryString);
    res.status(300).redirect(URL + queryString);
});
oauthRouter.get('/oauth', handleOauth_1.default, (req, res, next) => {
    res.status(200).json({ message: 'darude rules' });
});
exports.default = oauthRouter;
//# sourceMappingURL=oauth.js.map