import React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return savedUser;
  });

  const login = () => {
    window.location.href = '/.netlify/functions/app/login';
  };

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/.netlify/functions/app/logout';
  };

  useEffect(() => {
    const getUser = () => {
      fetch('/.netlify/functions/app/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          else {
            localStorage.removeItem('user');
            setUser(null);
            throw new Error('Failed to authenticate user');
          }
        })
        .then((resObject) => {
          const object = resObject;
          if (!user) {
            setUser(object.user);
            localStorage.setItem('user', JSON.stringify(object.user));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser(); // eslint-disable-next-line
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
