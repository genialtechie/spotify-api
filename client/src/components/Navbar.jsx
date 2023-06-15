import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ReactComponent as ProfileIcon } from '../assets/svg/profile.svg';
import { ReactComponent as TopArtistsIcon } from '../assets/svg/artists.svg';
import { ReactComponent as TopTracksIcon } from '../assets/svg/songs.svg';
import { ReactComponent as LogoutIcon } from '../assets/svg/logout.svg';

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div className="rounded-lg w-fit h-fit sticky top-0 mt-10 inset-x-0 mx-auto bg-[#101010] text-white z-10">
      <ul className="h-fit p-2 flex flex-row justify-around ">
        <li className="group rounded-sm px-2">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-green-500 h-full lg:pr-3 text-xs lg:text-md justify-center items-center flex flex-col lg:flex-row'
                : 'h-full lg:pr-3 text-xs lg:text-md justify-center group-hover:text-green-500 items-center flex flex-col lg:flex-row transition-all delay-75 ease-in-out duration-200'
            }
            to="/"
            end
          >
            <ProfileIcon className="scale-75 group-active:text-green-500 lg:scale-50 lg:inline-block" />
            <span className="font-sans">Profile</span>
          </NavLink>
        </li>
        <li className="group rounded-sm px-2">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-green-500 h-full md:pr-3 text-xs md:text-md justify-center items-center flex flex-col md:flex-row'
                : 'h-full md:pr-3 text-xs md:text-md justify-center group-hover:text-green-500 items-center flex flex-col md:flex-row transition-all delay-75 ease-in-out duration-200'
            }
            to="/top-artists"
          >
            <TopArtistsIcon className="scale-75 group-active:text-green-500 md:scale-50 md:inline-block" />
            <span className="font-sans">Top Artists</span>
          </NavLink>
        </li>
        <li className="group rounded-sm px-2">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-green-500 h-full md:pr-3 text-xs md:text-md justify-center items-center flex flex-col md:flex-row'
                : 'h-full md:pr-3 text-xs md:text-md group-hover:text-green-500 justify-center items-center flex flex-col md:flex-row transition-all delay-75 ease-in-out duration-200'
            }
            to="/top-tracks"
          >
            <TopTracksIcon className="scale-75 group-active:text-green-500 md:scale-50 md:inline-block" />
            <span className="font-sans">Top Tracks</span>
          </NavLink>
        </li>
        <li className="group rounded-sm px-2">
          <button
            className="group-hover:text-green-500 group-hover:cursor-pointer h-full md:pr-3 text-xs md:text-md justify-center items-center flex flex-col md:flex-row transition-all delay-75 ease-in-out duration-200"
            onClick={logout}
          >
            <LogoutIcon className="scale-75 md:scale-50 md:inline-block" />
            <span className="font-sans">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
