## Spotify Stats Visualizer

This is a MERN stack application that visualizes your Spotify listening history. It uses the Spotify API to get your listening history and then displays it in a nice way. You can also see your top artists and tracks. It has a simple login system that uses Spotify's OAuth2 API. In order to use this application, you need to have a Spotify account. You can sign up for one [here](https://www.spotify.com/us/signup/). You can also check out the live version [here](https://spotify-dash.netlify.app/).

### Preview

![Preview](https://res.cloudinary.com/dpti4rlt1/image/upload/v1671190987/spotify-api1_xsbmw5.png)

### How to use

1. Clone the repository
2. Run `npm install` in the root directory
3. Run `npm install` in the client directory
4. Create a `.env` file in the root directory and add the following environment variables:
   - `SPOTIFY_CLIENT_ID` - Your Spotify client ID
   - `SPOTIFY_CLIENT_SECRET` - Your Spotify client secret
   - `REDIRECT_URI` - The redirect URI you set up in your Spotify developer dashboard
   - `MONGODB_CLIENT_ID` - The URI to your MongoDB database
5. Run `npm start` in the root directory
6. Go to `localhost:3000` in your browser
7. Click the login button and log in with your Spotify account
8. Or you can just go to [this website](https://spotify-dash.netlify.app) and use it there.
9. Dm me @genialtechie on twitter so I can grant your spotify account permission to use the app.

### Features

- Login with Spotify
- View your top artists and tracks
- View your listening history // TODO
- View your listening history by year // TODO

### Technologies

- React
- Node.js
- Express
- MongoDB
- Mongoose
- Netlify Lambda for serverless functions
- Spotify API
- OAuth2 with Passport.js
