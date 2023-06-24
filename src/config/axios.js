import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://backend-8po1.onrender.com/api',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
});

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default axiosInstance;