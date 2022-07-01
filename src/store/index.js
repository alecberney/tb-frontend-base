import Vue from 'vue'
import Vuex from 'vuex'

import {files} from './modules/files'
import {jobCategories} from './modules/jobCategories'
import {jobs} from './modules/jobs'
import {messages} from './modules/messages'
import {user} from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        files: files,
        JobCategories: jobCategories,
        jobs: jobs,
        messages: messages,
        user: user,
    },
    state: {
        /*formData: {
            dialog: false,
            initialJob: null,
        },*/
    },

    mutations: {
        setToken(state, value) { state.keycloakToken = value },
        setParsedToken(state, value) { state.keycloakParsedToken = value },
    },

    getters: {
        getToken: state => state.keycloakToken,
        getParsedToken: state => state.keycloakParsedToken,
        //getNotifications: state => state.jobs.filter(job => state.user.isTechnician ? job.notify_technician : job.notify_client).length, // TODO: adapt
        //getFormData: state => state.formData,
    },

    actions: {
        /*openJobForm({ commit }, payload) {
            this.state.formData.dialog = true
            this.state.formData.initialJob = payload
        },
        closeJobForm({ commit }) {
            this.state.formData.dialog = false
        },*/
    },
})
