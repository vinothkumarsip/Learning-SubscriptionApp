import axios from "axios";

const API_URL = "http://localhost:5000/api";

const AuthService = {
  signup: (customerData) => axios.post(`${API_URL}/signup`, customerData),

  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      console.log("Full API Response:", response);

      sessionStorage.setItem("authToken", response.data.token);
      sessionStorage.setItem("customer", JSON.stringify(response.data.customer));

      return response.data;
    } catch (error) {
      console.error("AuthService Login Error:", error);
      throw error;
    }
  },

  checkAuth: () => {
    const token = sessionStorage.getItem("authToken");
    return !!token;
  },

  getUser: () => {
    const customer = sessionStorage.getItem("customer");
    return customer ? JSON.parse(customer) : null;
  },

  logout() {
    sessionStorage.removeItem("authToken"); 
    sessionStorage.removeItem("customer"); 
  },
};

export default AuthService;