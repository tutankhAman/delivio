import { createContext, useEffect, useState } from "react";
import ProductAPI from "./api/ProductAPI";
import UserAPI from "./api/UserAPI";
import axios from './api/axiosConfig';  // Import the configured axios instance

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    try {
      const res = await axios.get('/user/refresh_token');
      setToken(res.data.accesstoken);
    } catch (err) {
      console.error('Error refreshing token:', err);
      localStorage.removeItem('firstLogin');
    }
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      refreshToken();
      const refreshInterval = setInterval(refreshToken, 15 * 60 * 1000);
      return () => clearInterval(refreshInterval);
    }
  }, []);

  const state = {
    token: [token, setToken],
    productAPI: ProductAPI(),
    userAPI: UserAPI(token)
  };

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  );
};