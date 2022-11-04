import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Loading from './Loading';

const TopArtists = () => {
  const { user } = useAuth();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        'https://api.spotify.com/v1/me/top/artists',
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          params: {
            limit: 20,
            time_range: 'short_term',
          },
        }
      );
      const tempArtists = data.items.map((item) => {
        return {
          name: item.name,
          image: item.images[2]?.url || null,
          uri: item.uri,
          id: item.id,
        };
      });
      setArtists(tempArtists);
      setLoading(false);
    };
    fetchData();
  }, [artists]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="lg:p-10 p-5 flex flex-col justify-center items-center h-full w-full">
      <h1 className="text-2xl text-center font-bold mb-5 lg:pt-0 pt-28">
        Top Artists
      </h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="my-auto h-5/6 w-full overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {artists.map((artist) => {
              return (
                <div
                  key={artist.id}
                  className="w-36 h-40 flex flex-col items-center"
                >
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-32 h-32 rounded-full mb-1"
                  />
                  <p className="text-center text-sm text-slate-400 font-sans">
                    {artist.name}
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

export default TopArtists;
