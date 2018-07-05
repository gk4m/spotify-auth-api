import express from 'express';
import config from '../config';
import middleware from './middleware';
import routes from './routes';

const app = express();

app.listen(config.port);

middleware(app, express);

routes(app);

console.log(`Listen on port: ${config.port}`);

export default app;
