"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
const { FACEBOOK_APP_SECRET, LOCAL_OAUTH_ROUTE, FB_CLIENT_ID } = process.env;
const handleOauth = async function (req, res, next) {
    if (req.query.state !== process.env.OAUTH_SECRET) {
        next(new Error('Bad code, suspect imposter.'));
        return;
    }
    const token = await exchangeCodeForToken(req.query.code);
    const appAccessToken = await getAppAccesToken();
    try {
        console.log('app access token ', appAccessToken);
        const options = {
            input_token: token,
            access_token: appAccessToken
        };
        const queryString2 = Object.keys(options).map(key => `${key}=${options[key]}`);
        const getInspectTokenUrl = 'https://graph.facebook.com/debug_token?';
        const inspectedToken = await superagent_1.default.get(getInspectTokenUrl + queryString2);
        next();
    }
    catch (err) {
        console.log(err.response.res.text);
    }
};
async function exchangeCodeForToken(code) {
    const TOKEN_SERVER_URL = 'https://graph.facebook.com/v6.0/oauth/access_token?';
    const query = {
        client_id: FB_CLIENT_ID,
        redirect_uri: LOCAL_OAUTH_ROUTE,
        client_secret: FACEBOOK_APP_SECRET,
        code: code
    };
    const queryString = Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
    const getAccessUrl = TOKEN_SERVER_URL + queryString;
    const results = await superagent_1.default.get(getAccessUrl);
    return results.body.access_token;
}
async function getAppAccesToken() {
    const appOptions = {
        client_id: FB_CLIENT_ID,
        client_secret: FACEBOOK_APP_SECRET,
        grant_type: 'client_credentials'
    };
    const appQueryString = Object.keys(appOptions).map(key => `${key}=${appOptions[key]}`).join('&');
    const url = 'https://graph.facebook.com/oauth/access_token?' + appQueryString;
    const results = await superagent_1.default.get(url);
    return results.body.access_token;
}
exports.default = handleOauth;
//# sourceMappingURL=handleOauth.js.map