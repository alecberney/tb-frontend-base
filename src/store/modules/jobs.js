import axios from "axios";
import {API_ROUTE} from "/src/store/apiTools";

const JOBS_ROUTE = `${API_ROUTE}/jobs`;

export const jobs = {
  state: {
    jobs: [],
    unassignedJobs: []
  },

  mutations: {
    setJobs(state, value) { state.jobs = value },
    setUnassignedJobs(state, value) { state.unassignedJobs = value },
    addOrUpdateJob(state, value) {
      if (!Array.isArray(value)) value = [value]
      value.forEach(element => {
        let index = state.jobs.findIndex(job => job.id === element.id)
        if (index !== -1) {//If the job exists, the new timeline, files and messages are appended to the existing ones
          let timeline = element.timeline ? state.jobs[index].timeline.concat(element.timeline) : state.jobs[index].timeline
          let files = element.files ? state.jobs[index].files.concat(element.files) : state.jobs[index].files
          let messages = state.jobs[index].messages
          Object.assign(state.jobs[index], element)
          state.jobs[index].timeline = timeline
          state.jobs[index].files = files
          state.jobs[index].messages = messages
        }
        else {//If it doesn't, it is added in the jobs array
          state.jobs.unshift(element)
        }
      })
    },
    addOrRemoveUnassignedJob(state, value) {
      if (!Array.isArray(value)) value = [value]
      value.forEach(element => {
        if (!element.technician_id) {//If the job in unassigned, it is added to the unassigned jobs array // TODO: adapt
          state.unassignedJobs.unshift(element)
        }
        else {//If it is, it is removed from the unassigned jobs array
          let index = state.unassignedJobs.findIndex(job => job.id === element.id)
          if (index !== -1) state.unassignedJobs.splice(index, 1)
        }
      })
    },
    removeJob(state, value) {
      let index = state.jobs.findIndex(job => job.id === value.id)
      if (index !== -1) state.jobs.splice(index, 1)
    },
  },

  getters: {
    getJobs: state => state.jobs,
    getUnassignedJobs: state => state.unassignedJobs,
  },

  actions: {
    // Retrieves all of user's jobs from the database.
    // The returned array contains the files and the (timeline) events of each job
    retrieveJobs(context) {
      return axios
          .get(`${JOBS_ROUTE}/user/${this.getters.getUser.id}`)
          .then((response) => {
            context.commit("setJobs", response.data)
          })
    },
    // Retrieves all unassigned jobs.
    // Available to the technicians
    retrieveUnassignedJobs(context) {
      return axios
          .get(`${JOBS_ROUTE}/unassigned`)
          .then((response) => {
            context.commit("setUnassignedJobs", response.data)
          })
    },
    // Updates the status of a job
    // payload: {id: job's id, status: the new status}
    updateJobStatus(context, payload) {
      // TODO: add working_hours to form
      let data = {
        id: payload.id,
        status: payload.status,
        worker_switch_uuid: this.getters.getUser.id
      }
      if (payload.status === 'completed') {
        data.working_hours = payload.working_hours;
      }
      return axios
          .patch(`${JOBS_ROUTE}/status`, data)
          .then((response) => {
            context.commit("addOrUpdateJob", response.data)
          })
    },
    // Sets the job's status_alert to false
    // payload: job's id
    updateJobNotify(context, payload) {
      return axios
          .patch(`${JOBS_ROUTE}/notifications/${payload}`)
          .then((response) => {
            context.commit("addOrUpdateJob", response.data)
          })
    },
    // Creates a new job/files in the database
    // payload: {job: the new job, files: array of associated files}
    storeJob(context, payload) {
      let formData = new FormData()
      formData.append('title', 'test')
      formData.append('description', payload.job.description)
      formData.append('deadline', payload.job.deadline.toJSON())
      //formData.append('job_type', payload.job.jobType)
      //formData.append('job_type', payload.job.job_category_id)
      formData.append('client_switch_uuid', payload.job.clientId)
      payload.files.forEach(file => {
        formData.append('files[]', file)
      })
      return axios
          .post(`${JOBS_ROUTE}`, formData)
          .then((response) => {
            context.commit("addOrUpdateJob", response.data)
          })
    },
    // Locally sets all job's "notify_(client/technician)" to false.
    // Use updateJobNotify() to do it server side
    // payload: job's id
    clearAllNotify(context, payload) {
      let job = context.state.jobs.find(job => job.id === payload)
      job.messages.forEach(element => {
        element.notify = false
      })
      job.timeline.forEach(element => { //TODO: adapt
        context.getters.getUser.is_technician ? element.notify_technician = false : element.notify_client = false
      })
    },
    // Assigns the job's technician_id
    // payload: [job's IDs]
    assignJob(context, payload) {
      payload.forEach(job_id => {
        return axios
            .patch(`${JOBS_ROUTE}/worker/assign`, {
              id: job_id,
              worker_switch_uuid: this.getters.getUser.id
            })
            .then((response) => {
              context.commit("addOrUpdateJob", response.data)
            })
      })
    },
    // Closes the job by soft-deleting it
    // payload: {id: job's id, rating: job rating}
    terminateJob(context, payload) {
      return axios
          .post(`${JOBS_ROUTE}/rating`, {
            id: payload.id,
            rating: payload.rating
          })
          .then((response) => {
            context.commit("removeJob", response.data)
          })
    },
  }
}