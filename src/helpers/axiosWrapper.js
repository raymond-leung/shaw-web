import axios from 'axios';
import localStorage from './cache';

//Setup interceptor
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if(error.response.status === 401) {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('childrens-auth-token');
    }

    return Promise.reject(error);
});

export default {
    get(url, config = {}) {
        let headers = config.headers || {};
        let authKey = localStorage.getItem('auth-token') || localStorage.getItem('childrens-auth-token');
        if(authKey) {
            headers = { ...headers, authorization: "bearer " + authKey };
        }

        return axios({
            method: "GET",
            url: url,
            headers: headers
        });
    },
    post(url, config = {}) {
        let headers = config.headers || {};
        let authKey = localStorage.getItem('auth-token') || localStorage.getItem('childrens-auth-token');
        if(authKey) {
            headers = { ...headers, authorization: "bearer " + authKey };
        }

        return axios({
            method: "POST",
            url: url,
            data: config.data,
            headers: headers
        });
    },
    put(url, config = {}) {
        let headers = config.headers || {};
        let authKey = localStorage.getItem('auth-token') || localStorage.getItem('childrens-auth-token');
        if(authKey) {
            headers = { ...headers, authorization: "bearer " + authKey };
        }

        return axios({
            method: "PUT",
            url: url,
            data: config.data,
            headers: headers
        });
    },
    remove(url, config = {}) {
        let headers = config.headers || {};
        let authKey = localStorage.getItem('auth-token') || localStorage.getItem('childrens-auth-token');
        if(authKey) {
            headers = { ...headers, authorization: "bearer " + authKey };
        }

        return axios({
            method: "DELETE",
            url: url,
            headers: headers
        });
    }
};
