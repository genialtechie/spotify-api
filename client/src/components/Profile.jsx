import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { ReactComponent as DefaultUser } from '../assets/svg/default-user.svg';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    const getProfile = () => {
      axios
        .get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          const obj = res.data;
          setProfile({
            name: obj.display_name,
            email: obj.email,
            image: obj.images[0]?.url || null,
            followers: obj.followers.total,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="p-10 flex justify-center items-center">
      <div className="w-full h-full lg:w-3/5">
        <h1 className="text-3xl text-center tracking-wide mb-8">Profile</h1>
        <div className="flex flex-col h-full items-center">
          <div className="mx-auto w-64 h-64 rounded-full">
            {profile?.picture ? (
              <img
                src={profile.picture}
                alt="profile"
                className="w-full h-full rounded-full"
              />
            ) : (
              <DefaultUser className="text-slate-300" />
            )}
          </div>
          <h2 className="text-2xl text-center tracking-wide mt-4">
            {profile?.name}
          </h2>
          <div className="flex flex-col lg:flex-row lg:justify-between w-full mt-8">
            <span>
              <strong>Email:</strong>
              <span className="text-slate-400 ml-3">{profile?.email}</span>
            </span>
            <span>
              <strong>Followers:</strong>
              <span className="text-slate-400 ml-3">{profile?.followers}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
