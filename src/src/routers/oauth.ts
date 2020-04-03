import express from 'express';
import { ITokenedRequest } from '../../src/app'
import handleOauth from '../../middleware/handleOauth'


const oauthRouter = express.Router();

//oauth related routes
//user shows intent for FB Oauth.
oauthRouter.get('/oauth-fb', (req: ITokenedRequest, res: express.Response, next: any) => {
  const URL = 'https://www.facebook.com/v6.0/dialog/oauth?';
  const options: { [key: string]: string } = {
    client_id: process.env.FB_CLIENT_ID,
    redirect_uri: process.env.LOCAL_OAUTH_ROUTE,
    state: process.env.OAUTH_SECRET,
    response_type: 'code'
  }
  let queryString = Object.keys(options).map(key => {
    return `${key}=${options[key]}`;
  }).join('&');

  console.log('token query string: ', queryString)
  res.status(300).redirect(URL + queryString)
})

oauthRouter.get('/oauth', handleOauth, (req: ITokenedRequest, res: express.Response, next: any) => {
  res.status(200).json({message: 'darude rules'})
})



export default oauthRouter;