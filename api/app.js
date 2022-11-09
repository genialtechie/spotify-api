require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const passport = require('passport');
const session = require('express-session');
const SpotifyStrategy = require('passport-spotify').Strategy;
const serverless = require('serverless-http');
const path = require('path');
const MongoStore = require('connect-mongo');

const indexRouter = require('./routes/index');

const app = express();
const port = process.env.PORT || '5000';

// CONNECT TO MONGODB ATLAS CLUSTER
try {
  const uri = process.env.MONGODB_CLIENT_ID;
  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log('Connected to Mongo Cluster!')
  );
} catch (error) {
  console.error(error);
}

// MIDDLEWARE
app.use(
  cors({
    origin: 'http://localhost:' + port,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use(
  session({
    secret: 'messidagoat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CLIENT_ID,
    }),
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      User.findOrCreate(
        { spotifyId: profile.id },
        {
          name: profile.displayName,
          refreshToken: refreshToken,
          accessToken: accessToken,
        },
        function (err, user) {
          if (user.accessToken !== accessToken) {
            User.findOneAndUpdate(
              { spotifyId: profile.id }, // filter
              {
                accessToken: accessToken,
                refreshToken: refreshToken,
              }, // update
              {
                new: true,
                lean: true,
              }, // return updated doc
              function (err, doc) {
                if (err) {
                  console.log('Something wrong when updating data!');
                }
                user = doc;
              }
            );
          }
          return done(err, user);
        }
      );
    }
  )
);

app.use('/.netlify/functions/app', indexRouter);
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = app;
module.exports.handler = serverless(app);
