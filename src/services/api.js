import axios from "axios";

const api = axios.create({
  baseURL:
    "https://taskflow-backend-fz9a.onrender.com/api"
});

export default api;