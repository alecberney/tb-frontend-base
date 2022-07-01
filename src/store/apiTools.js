import axios from "axios";
import {keycloak} from "@/main"

const API_ROUTE='http://localhost:80/api';

axios.interceptors.request.use(function (config) {
  const token = keycloak.idToken;
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {
  API_ROUTE
}
