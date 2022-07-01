import axios from "axios";
import {API_ROUTE} from "/src/store/apiTools";

const JOB_CATEGORIES_ROUTE = `${API_ROUTE}/job_categories`;

export const jobCategories = {
  state: {
    jobCategories: []
  },
  mutations: {
    setJobCategories(state, value) {
      state.jobCategories = value
    }
  },
  getters: {
    getJobCategories: state => state.jobCategories,
  },
  actions: {
    // Retrieves job categories infos
    retrieveJobCategories(context) {
      return axios
          .get(`${JOB_CATEGORIES_ROUTE}`)
          .then((response) => {
            context.commit("setJobCategories", response.data)
          })
    },
  }
}