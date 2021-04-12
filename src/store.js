import Vue from 'vue'
import Vuex from 'vuex'
import Data from "./data";
// import Authenticator from "./authenticator";

Vue.use(Vuex);
const data = new Data();

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
        loggedId: '',
        loggedUser: localStorage.getItem('user-name') || '',//JSON.parse(window.localStorage.getItem('user-name') || '{}'),
    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
        loggedId: state => state.loggedId,
        loggedUser: state => state.loggedUser,
    },
    actions: {
        [AUTH_REQUEST]: ({commit, state}, user) => {
            return new Promise((resolve) => { // The Promise used for router redirect in login
                commit(AUTH_REQUEST);
                data.getSecrets().then(response=> {
                   console.log("response", response);
                   const userId = data.checkLoginData(response, user);
                   if(userId) {
                       commit(AUTH_SUCCESS, 'token');
                       localStorage.setItem('user-token', 'token');
                       resolve();
                       state.loggedId = userId;
                       data.getUsers().then(users =>
                           {

                               const usersArray = Object.entries(users).map(user=>{
                                   console.log("user", user);
                                   return { id: user[1].id, firstName: user[1].firstName, lastName: user[1].lastName, email: user[1].email };
                               });

                               const loggedUserObj = usersArray.find(user=>user.id === userId);
                               state.loggedUser = `${loggedUserObj.firstName}, ${loggedUserObj.lastName}`;
                               localStorage.setItem('user-name', state.loggedUser);
                           }
                       );


                   } else {
                       commit(AUTH_ERROR, 'error');
                   }
                });
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
            console.log("Auth Request!");
        },
        [AUTH_SUCCESS]: (state, token) => {
            console.log("Success login!");
            state.status = 'success';
            state.token = token
        },
        [AUTH_LOGOUT]: (state) => {
            state.status = 'logout';
            state.token = null;
        },
        [AUTH_ERROR]: (state) => {
            state.status = 'error';
        },
    }
});



