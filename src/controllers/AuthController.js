import querystring from 'querystring'
import request from 'request'

import config from './../../config'
import utils from './../utils'

const AuthController = {
  login: function (req, res) {
    const state = utils.generateRandomString(16);

    const url = config.spotifyAccountsAPI + 'authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: config.clientID,
        scope: config.scope,
        redirect_uri: config.redirectUri,
        state: state
      });

    res.status(200).json(url);
  },

  callback: function (req, res) {
    console.log('callback')
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {

      const authOptions = {
        url: config.spotifyAccountsAPI + 'api/token',
        form: {
          code: code,
          redirect_uri: config.redirectUri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(config.clientID + ':' + config.clientSecret).toString('base64'))
        },
        json: true
      };

      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          const {access_token, refresh_token, expires_in} = body;

          res.redirect(config.clientURL + '#/login?' +
            querystring.stringify({
              access_token,
              refresh_token,
              expires_in
            }));
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  },

  refreshToken: function (req, res) {
    const refresh_token = req.query.refresh_token;

    const authOptions = {
      url: config.spotifyAccountsAPI + 'api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(config.clientID + ':' + config.clientSecret).toString('base64'))
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  }
};

export default AuthController;
