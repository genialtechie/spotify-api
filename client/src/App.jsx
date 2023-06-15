import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import TopArtists from './components/TopArtists';
import TopTracks from './components/TopTracks';
import Navbar from './components/Navbar';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <div className="p-0 h-full w-full bg-[url('./assets/img/tunetrackr-bg.png')]">
      <RequireAuth>
        <Navbar />
      </RequireAuth>
      <div className="w-full h-fit">
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/top-artists"
            element={
              <RequireAuth>
                <TopArtists />
              </RequireAuth>
            }
          />
          <Route
            path="/top-tracks"
            element={
              <RequireAuth>
                <TopTracks />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
