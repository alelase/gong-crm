import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

// const STORAGE_KEY = 'todos-vuejs';

export default new Vuex.Store({
    state: {
        //todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
        token: localStorage.getItem('user-token') || '',
        status: '',
    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
    },
    actions: {
        [AUTH_REQUEST]: ({commit}) => {
            return new Promise((resolve) => { // The Promise used for router redirect in login
                commit(AUTH_REQUEST);
                // axios({url: 'auth', data: user, method: 'POST' })
                //     .then(resp => {
                //         const token = resp.data.token;
                //         localStorage.setItem('user-token', token); // store the token in localstorage
                //         commit(AUTH_SUCCESS, token);
                //         // you have your token, now log in your user :)
                //         dispatch(USER_REQUEST);
                //         resolve(resp)
                //     })
                //     .catch(err => {
                //         commit(AUTH_ERROR, err);
                //         localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
                //         reject(err)
                //     })
                resolve();
            });
        },
        [AUTH_LOGOUT]: ({commit}) => {
            return new Promise((resolve) => {
                commit(AUTH_LOGOUT);
                localStorage.removeItem('user-token'); // clear your user's token from localstorage
                resolve();
            })
        }
    },
    mutations: {
        [AUTH_REQUEST]: (state) => {
            state.status = 'loading';
        },
        [AUTH_SUCCESS]: (state, token) => {
            state.status = 'success';
            state.token = token
        },
        [AUTH_LOGOUT]: (state) => {
            state.status = 'logout';
        },
        [AUTH_ERROR]: (state) => {
            state.status = 'error';
        },
    }
})
