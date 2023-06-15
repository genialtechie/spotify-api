import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Loading from './Loading';

const TopTracks = () => {
  const { user } = useAuth();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        'https://api.spotify.com/v1/me/top/tracks',
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json',
          },
          params: {
            limit: 20,
            time_range: 'medium_term',
          },
        }
      );
      const tempTracks = data.items.map((item) => {
        return {
          name: item.name,
          image: item.album.images[1]?.url || null,
          uri: item.uri,
          id: item.id,
        };
      });
      setTracks(tempTracks);
      setLoading(false);
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="g:p-10 p-5 flex flex-col justify-center items-center h-full w-full">
      <h1 className="text-xl text-center mb-10">
        Your most played tracks at the moment.
      </h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-fit">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-10 lg:gap-x-24 transition ease-in-out duration-150">
            {tracks.map((track, index) => {
              return (
                <div
                  key={track.id}
                  className="w-36 h-40 flex flex-col items-center group relative cursor-pointer"
                >
                  <img
                    src={track.image}
                    alt={track.name}
                    className="w-32 h-32 rounded-full mb-1 transition-all delay-200 ease-in-out duration-1000 group-hover:opacity-70"
                  />
                  <div className="w-32 h-32 hidden group-hover:flex rounded-full absolute top-0 group-hover:bg-slate-600/50 group-hover:z-10 group-hover:opacity-70 group-hover:shadow-lg items-center justify-center transition delay-200 ease-in-out duration-1000">
                    <span className="mx-auto my-auto p-1 truncate">
                      {index + 1}. {track.name}
                    </span>
                  </div>
                  <p className="text-center text-xs text-slate-400 font-sans">
                    {track.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopTracks;
