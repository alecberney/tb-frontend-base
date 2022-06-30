import axios from "axios";

/*axios.interceptors.request.use(function (config) {
    const token = this.$cookies.get('token');
    if (token !== null) {
        config.headers.Authorization = `Bearer ${keycloak.}`;
    }
    return config;
});*/

export async function apiRequest(jwt) {
    /*let data = {
        "title": "test",
        "description": "test",
        "deadline": "2022-09-20",
        "job_category_id": 1,
        "client_username": "alec.berney"
    }
    return axios.post(`${process.env.VUE_APP_ROOT_API}/jobs`, data, {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    });*/

    return axios.get(`${process.env.VUE_APP_ROOT_API}/jobs/client/alec.berney`, {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    });
}