import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ReactComponent as ProfileIcon } from '../assets/svg/profile.svg';
import { ReactComponent as TopArtistsIcon } from '../assets/svg/artists.svg';
import { ReactComponent as TopTracksIcon } from '../assets/svg/songs.svg';
import { ReactComponent as LogoutIcon } from '../assets/svg/logout.svg';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div
      id="navbar"
      className="w-full h-fit flex flex-row lg:block lg:h-full lg:w-fit p-2 relative"
    >
      <h1 className="text-4xl hidden lg:block lg:mb-5">
        Spotify
        <br />
        Stats
        <br />
        Visualizer
      </h1>
      <nav className="w-8/12 lg:w-fit">
        <ul className="h-full flex flex-row justify-around lg:flex-col">
          <li className="transition ease-in-out duration-150 hover:bg-slate-400 rounded-sm px-2">
            <Link
              className="h-full lg:pr-3 text-xs lg:text-md justify-center items-center flex flex-col lg:flex-row"
              to="/"
            >
              <ProfileIcon className="scale-75 lg:scale-50 lg:inline-block" />
              <span className="font-sans">Profile</span>
            </Link>
          </li>
          <li className="transition ease-in-out duration-150 hover:bg-slate-400 rounded-sm px-2">
            <Link
              className="h-full lg:pr-3 text-xs lg:text-md justify-center items-center flex flex-col lg:flex-row"
              to="/top-artists"
            >
              <TopArtistsIcon className="scale-75 lg:scale-50 lg:inline-block" />
              <span className="font-sans">Top Artists</span>
            </Link>
          </li>
          <li className="transition ease-in-out duration-150 hover:bg-slate-400 rounded-sm px-2">
            <Link
              className="h-full lg:pr-3 text-xs lg:text-md justify-center items-center flex flex-col lg:flex-row"
              to="/top-tracks"
            >
              <TopTracksIcon className="scale-75 lg:scale-50 lg:inline-block" />
              <span className="font-sans">Top Tracks</span>
            </Link>
          </li>
        </ul>
      </nav>
      {user && (
        <div className="ml-4 lg:ml-auto lg:absolute lg:bottom-0">
          <p className="hidden lg:block text-center font-sans text-xs text-slate-400 lg:mb-2">
            Logged in as {user.name}, Not you?
          </p>
          <button className="bg-green-500 hover:bg-green-700 text-white py-1 lg:py-0 px-4 rounded">
            <Link
              className="text-xs lg:text-md justify-center items-center flex flex-col lg:flex-row"
              onClick={logout}
            >
              <LogoutIcon className="scale-75 lg:scale-50 lg:inline-block" />
              <span className="font-sans">Log Out</span>
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
