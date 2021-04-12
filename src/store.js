import Vue from 'vue'
import Vuex from 'vuex'
import Authenticator from './authenticator';

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
        [AUTH_REQUEST]: ({commit}, user) => {
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
                //
                //         localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
                //         reject(err)
                //     })

               getSecrets().then(response=> {
                   console.log("response", response);
                   if(checkLoginData(response, user)) {
                       commit(AUTH_SUCCESS, 'token');
                       localStorage.setItem('user-token', 'cucu'); // store the token in localstorage
                       resolve();
                   } else {
                       commit(AUTH_ERROR, 'error');
                   }
                });

                // const data = getSecrets();
                // console.log("data", data);
                // checkLoginData(data);

                // localStorage.setItem('user-token', 'cucu'); // store the token in localstorage
                // commit(AUTH_SUCCESS, 'cucu');
                // resolve();
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


async function getSecrets() {
    const myHeaders = new Headers();

    const myRequest = new Request('https://gongfetest.firebaseio.com/secrets.json', {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
    });


    const response = await fetch(myRequest)
        .then(response => response.json())
        .then(data => {return data});

    console.log("Llego?", response);
    return response;
}


function checkLoginData(secrets, user) {
    console.log("secrets", secrets);
    let mapSecret = new Map(Object.entries(secrets));
    console.log("mapSecret", mapSecret);
    console.log("user", user);


    const auth = new Authenticator();
    const secret = auth.encode(user.username, user.password);
    console.log("secret", secret);

    const userId = mapSecret.get(secret);
    console.log("userId", userId);
    return userId;
}


