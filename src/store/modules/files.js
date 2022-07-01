import axios from "axios";
import {API_ROUTE} from "/src/store/apiTools";

const FILES_ROUTE = `${API_ROUTE}/files`;

export const files = {
  state: {},
  mutations: {},
  getters: {},
  actions: {
    // Creates new files in the database
    // payload: {id: job's ID, files: array of files}
    storeFiles(context, payload) {
      let formData = new FormData()
      formData.append('job_id', payload.id)
      payload.files.forEach(file => {
        formData.append('files[]', file)
      }) // TODO: for each
      return axios.post(`${FILES_ROUTE}`, formData)
          .then((response) => {
            context.commit("addOrUpdateJob", response.data)
          })
    },
    // Downloads a stored file
    // payload: file's id
    downloadFile(context, payload) {
      return axios
          .get(`${FILES_ROUTE}/${payload}`, { responseType: 'arraybuffer' })
    },
  }
}
