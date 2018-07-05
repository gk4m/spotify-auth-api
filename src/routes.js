import AuthController from './controllers/AuthController'

export default function (app) {
  app.get('/', function (req, res) {
    res.status(200).json({
      message: 'ok'
    })
  });

  app.get('/login', AuthController.login);
  app.get('/callback', AuthController.callback);
  app.get('/refresh_token', AuthController.refreshToken);
}
