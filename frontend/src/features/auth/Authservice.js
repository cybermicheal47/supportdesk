import axios from 'axios';
const proxyUrl = process.env.REACT_APP_API_PROXY;

// Use proxyUrl as your API base URL in Axios or other requests
axios.defaults.baseURL = proxyUrl;

const API_URL = '/api/users';

// Register users
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    // Handle error here
    console.error('Registration failed:', error);
    throw error;
  }
};

//login 
const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + '/login', userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    // Handle error here
    console.error('Login failed:', error);
    throw error;
  }
};


//logout
const logout = () => localStorage.removeItem('user')

const Authservice = {
  register,
  logout,
  login
};

export default Authservice;
