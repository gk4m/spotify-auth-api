import express from 'express';
import config from '../config';
import middleware from './middleware';
import routes from './routes';

const app = express();
const port = process.env.PORT || config.port;

app.listen(port);

middleware(app, express);

routes(app);

console.log(`Listen on port: ${port}`);

export default app;
