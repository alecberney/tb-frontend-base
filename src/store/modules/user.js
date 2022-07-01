import axios from "axios";
import {API_ROUTE} from "/src/store/apiTools";

const USERS_ROUTE = `${API_ROUTE}/users`;

//const USERS_ROUTE = 'http://localhost:80/api/users';

const CLIENT_ROLE = 'client';
const WORKER_ROLE = 'worker';
const ADMIN_ROLE = 'admin';

export const user = {
  state: {
      user: null,//JSON.parse(document.querySelector("meta[type='user']").getAttribute("value")),
  },
  mutations: {
      setUser(state, value) { state.user = value },
  },
  getters: {
      getUser: state => state.user,
      userIsWorker: state => state.user.roles.contains(WORKER_ROLE),
      userIsAdmin: state => state.user.roles.contains(ADMIN_ROLE),
      userIsClient: state => state.user.roles.contains(CLIENT_ROLE),
  },
  actions: {
    // Self-explanatory
    /*logout(context) {
      return axios
          .get(`${USERS_ROUTE}/logout`)
    },*/
    // Updates the database values of the user's settings
    // payload : [{name: property name, value: true/false}] //TODO: adapt
    updateSettings(context, payload) {
      return axios
          .post(`${USERS_ROUTE}/notifications`, { fields: payload }) //TODO: adapt
          .then((response) => {
            context.commit("setUser", response.data.data)
          })
          .catch(error => {
              console.log(error);
          })
    },
    // Retrieves the user's infos
    retrieveUser(context, username) {
      return axios
          .get(`${USERS_ROUTE}/${username}`)
          .then((response) => {
            context.commit("setUser", response.data.data)
          })
          .catch(error => {
            console.log(error);
          })
    },
  }

}