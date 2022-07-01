import axios from "axios";
import updateToken from "/src/middleware/keycloakUpdateToken";

const API_ROUTE='http://localhost:80/api';

axios.interceptors.request.use(async function (config) {
  const token = await updateToken();
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {
  API_ROUTE
}
