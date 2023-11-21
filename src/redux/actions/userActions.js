import axios from 'axios';
import {
  setLoading,
  setError,
  userLogin,
  userLogout,
  userRegister,
  setToken,
} from '../slices/user';

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      'https://notes-app-backend-2q54.onrender.com/api/v1/users/login',
      // 'http://localhost:8008/api/v1/users/login',
      { email, password },
      config
    );
    // console.log(data);
    // console.log(data.data.token);
    dispatch(userLogin(data));
    dispatch(setToken(data.data.token));
    localStorage.setItem('userInfo', JSON.stringify(data));
    localStorage.setItem('token', JSON.stringify(data.data.token));
  } catch (error) {
    console.log(error);
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Error'
      )
    );
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(userLogout());
};
export const register = (name, email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      'https://notes-app-backend-2q54.onrender.com/api/v1/users/signup',
      // 'http://localhost:8008/api/v1/users/signup',
      { name, email, password },
      config
    );
    console.log(data);
    dispatch(userRegister(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Error'
      )
    );
  }
};
