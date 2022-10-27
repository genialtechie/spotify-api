import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full absolute lg:w-1/5">
      <h1 className="text-3xl">
        Spotify
        <br />
        Stats
        <br />
        Visualizer
      </h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>Top Artists</li>
          <li>Top Tracks</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
