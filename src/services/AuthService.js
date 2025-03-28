const API_URL = "http://localhost:5000";

const AuthService = {

  signup: async (signupData) => {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });

    if (!response.ok) {
      throw new Error(`Signup failed! Status: ${response.status}`);
    }
    
    return response.json();
  },

  login: async (userData) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Login failed! Status: ${response.status}`);
    }

    return response.json();
  },
};

export default AuthService;
