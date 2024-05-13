class AuthService {
    // Check if the user is authenticated
    isAuthenticated() {
      // Logic to determine if the user is authenticated
      const accessToken = localStorage.getItem('access_token');
      return !!accessToken; // Return true if access token exists, indicating authentication
    }
  
    // Perform login operation
    login(credentials) {
      // Logic to perform login (e.g., sending login request to the server)
      // Return a promise that resolves when login is successful or rejects if login fails
      // Example:
      return axios.post('/api/login', credentials);
    }
  
    // Perform logout operation
    logout() {
      // Logic to perform logout (e.g., clearing user session data)
      // Example:
      localStorage.removeItem('access_token');
    }
  }
  
  export default new AuthService();
  