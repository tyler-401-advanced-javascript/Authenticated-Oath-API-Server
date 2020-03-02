import express from 'express';
import { ITokenedRequest } from '../src/app'
import superagent from 'superagent';
import jwt from 'jsonwebtoken';
const { FACEBOOK_APP_SECRET, LOCAL_OAUTH_ROUTE, FB_CLIENT_ID } = process.env;


const handleOauth = async function (req: ITokenedRequest, res: express.Response, next: any) {
  if (req.query.state !== process.env.OAUTH_SECRET) {
    next(new Error('Bad code, suspect imposter.'))
    return;
  }

  //(1.) exchange the code for a user access token. User will be redirected to FB to authorize. 
  const token = await exchangeCodeForToken(req.query.code)

  //(1.5) get app access token.
  const appAccessToken = await getAppAccesToken();
  
  //(2.) inspect the access token with the debugger endpoint.
  try {
    console.log('app access token ' , appAccessToken);
    const options: { [key: string]: string } = {
      input_token: token,
      access_token: appAccessToken
    }

    //todo: solve FB oauth flow issues. Which queries do I include to get a valid inspection from the /debug route? 
    const queryString2 = Object.keys(options).map(key => `${key}=${options[key]}`)
    const getInspectTokenUrl = 'https://graph.facebook.com/debug_token?';
    const inspectedToken = await superagent.get(getInspectTokenUrl + queryString2) as superagent.Response;
    next()
  } catch (err) {
    console.log(err.response.res.text)
  }
}

async function exchangeCodeForToken(code: string): Promise<string> {
  const TOKEN_SERVER_URL = 'https://graph.facebook.com/v6.0/oauth/access_token?'
  const query: { [key: string]: string } = {
    client_id: FB_CLIENT_ID,
    redirect_uri: LOCAL_OAUTH_ROUTE,
    client_secret: FACEBOOK_APP_SECRET,
    code: code
  }
  const queryString = Object.keys(query).map(key => `${key}=${query[key]}`).join('&')
  const getAccessUrl = TOKEN_SERVER_URL + queryString;
  const results = await superagent.get(getAccessUrl) as superagent.Response;
  return results.body.access_token;
}


async function getAppAccesToken(): Promise<string> {
  const appOptions: { [key: string]: string } = {
    client_id: FB_CLIENT_ID,
    client_secret: FACEBOOK_APP_SECRET,
    grant_type: 'client_credentials'
  }
  const appQueryString = Object.keys(appOptions).map(key => `${key}=${appOptions[key]}`).join('&')
  const url = 'https://graph.facebook.com/oauth/access_token?' + appQueryString;

  const results = await superagent.get(url)

  return results.body.access_token;
}








export default handleOauth;


/*
  GET https://graph.facebook.com/v6.0/oauth/access_token?
   client_id={app-id}
   &redirect_uri={redirect-uri}
   &client_secret={app-secret}
   &code={code-parameter}
   */