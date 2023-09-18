import axios from 'axios';

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

const Authservice = {
  register,
};

export default Authservice;
