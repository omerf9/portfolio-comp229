// src/api/auth.js authentication helpers
import { API_URL } from './config';

const TOKEN_KEY = 'portfolio_token';
const USER_KEY = 'portfolio_user';

//Save the token and user info after a successful sign in.
export const setAuth = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

//Get the stored JWT token, or null if not signed in.
export const getToken = () => localStorage.getItem(TOKEN_KEY);

//Get the stored user object, or null.
export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

//True if a token exists (user is signed in).
export const isAuthenticated = () => Boolean(getToken());

//Clear the token and user used on sign out.
export const signout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

//apiFetch a wrapper around fetch that automatically attaches
//the Authorization header when a token is available.
//Use this for every request to a protected endpoint.
export const apiFetch = (path, options = {}) => {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(`${API_URL}${path}`, { ...options, headers });
};
