import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  return (
    <div className="container h-screen overflow-hidden flex items-center justify-center">
      <div className="w-3/5 text-center">
        <h1 className="text-4xl font-bold mb-5">Spotify Stats Visualizer</h1>
        <p className="mb-5 font-sans">
          This app allows you to visualize your Spotify listening history. I
          built it with the MERN stack and the Spotify API. You can view your
          Spotify profile and also your top artists and tracks.
        </p>
        <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
          <Link onClick={login}>Login with Spotify</Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
