import axios from "axios";
import {API_ROUTE} from "/src/store/apiTools";

const MESSAGES_ROUTE = `${API_ROUTE}/messages`;

export const messages = {
  state: {},
  mutations: {
    addMessage(state, value) {
      let job = this.getters.getJobs.find(job => job.id === value.job_id)
      job.messages.push(value)
      if (this.getters.getUser.id === value.recipient_id) { // TODO: adapt
        this.getters.getUser.is_technician ? job.notify_technician = true : job.notify_client = true // TODO: adapt
      }
    },
  },
  getters: {},
  actions: {
    // Uploads a message
    // ->payload: {jobId: the job's ID, text: the message text}
    sendMessage(context, payload) {
      return axios
          .post(MESSAGES_ROUTE, {
            job_id: payload.jobId,
            text: payload.text
          })
          .then((response) => {
            context.commit("addMessage", response.data)
          })
    },
  }
}