//core dependencies / libraries
import express from 'express';
import bearerAuth from '../middleware/bearerAuth';
import acl from '../middleware/accessControlList'


//in-memory testing resource.
const chickens = [
  { name: 'chickety china', username: 'the chinese chicken' }
]

//interfaces
export interface ITokenedRequest extends express.Request {
  token?: string;
  user?: { [key: string]: any };
  bearer?: string | { [key: string]: any }
}

//instantiate and configure express
export const app = express();
app.use(express.json());
app.use(express.static('./dist/public'))

//routes
app.get('/chickens', bearerAuth, acl('admin'), (req: ITokenedRequest, res, next) => {
  res.status(200).json({ chickens, token: req.token });
})

//oauth routes
import oauthRouter from './routers/oauth'
app.use(oauthRouter);

//users routes
import usersRouter from './routers/users'
app.use(usersRouter);

//roles routes
import rolesRouter from './routers/roles';
app.use(rolesRouter);

//catch alls
//500 errors
import serverErrorHandler from '../middleware/500';
app.use(serverErrorHandler);

//400 errors
import notFoundHandler from '../middleware/404';
app.use(notFoundHandler);


export const startServer = async (port: string) => {
  const PORT = port || 3001;
  // https.createServer({
  //   key: fs.readFileSync(path.join(__dirname, '..', 'server.key')),
  //   cert: fs.readFileSync(path.join(__dirname, '..', 'server.cert'))
  // }, app).listen(PORT, () => {
    const listening =  await app.listen(PORT)
    console.log(`Listening on ${PORT}`)
    return listening;
}






