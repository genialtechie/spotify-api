var express = require('express');
var router = express.Router();
const passport = require('passport');
const request = require('postman-request');

router.get(
  '/login',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'user-top-read'],
    showDialog: true,
  })
);

router.get(
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/login/failed' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

router.get('/refresh_token', function (req, res) {
  // requesting access token from refresh token
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = req.user.refreshToken;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer.from(client_id + ':' + client_secret).toString('base64'),
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'login failure',
  });
});

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'user logged in',
      user: req.user,
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'user not logged in',
    });
  }
});

router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) err;
    else res.redirect('/login');
  });
});

module.exports = router;
