// Import Axios for making HTTP requests
import axios from 'axios'

const API_URL = 'http://localhost:3000'; // Replace this with your backend API URL

const AuthService = {
  async login(credentials) {
    try {
      // const email = credentials.email
      // const password = credentials.password
      // Make a POST request to your backend API to authenticate the user
      const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      // Check if the login was successful
      if (response.status === 200) {
        console.log(response.data)
        return response.data; // Return the user data
      }else {
        console.log('test1')
        throw new Error('Login failed: Incorrect credentials');
      }
    } catch (error) {
      // Handle other errors (e.g., network error)
      console.error('Login failed:', error.response.data);
      throw error;
    }
  },
  decodeToken(token){
    try {
      if (typeof token !== 'string') {
        throw new Error('Token must be a string.');
      }
      // Split the token into its parts
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format.');
      }
      // Decode the payload from base64

      const payloadJson = atob(parts[1]);
      // Parse the payload as JSON
      const payload = JSON.parse(payloadJson);
      return payload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },
};

export default AuthService;
