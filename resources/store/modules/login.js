import axios from 'axios';



const state = {
    user: {},    
    permissions: {},
    msg: 'BIENVENIDO AL DASHBOARD!', 
    message: '',
    errorLogin:[]

};

const getters = {};
const actions = {
    loginUsr({ commit }, user) {
        commit("SET_ERRORS", []);
        commit("SET_MESSAGE", "");
        axios
            .post("/user/login", {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem(
                        "blog_token",
                        response.data.access_token
                    );
                    window.location.replace("home");
                }
                if (response.data.message) {
                    commit("SET_MESSAGE", response.data.message);
                }
            })
            .catch(e => {                
                commit("SET_ERRORS", e.response.data.errors);
            });
    },

    logoutUser() {
        localStorage.removeItem("blog_token");
        window.location.replace("login");
    },

    getCurrent({ commit }) {
        axios.get("api/v1/user/currents").then(response => {
            commit("SET_USER", response.data);
        });
    },

    getPermission({ commit }) {
        axios.get("api/v1/user/permissions").then(response => {
            commit("SET_PERMISSIONS", response.data.permissions);
        });
    }
};

const mutations = {
    //es para poder modificar las variables del state
    SET_USER(state, data){
        state.user = data;
    },

    SET_PERMISSIONS(state, data){
        state.permissions = data;
    }, 

    SET_MESSAGE(state, data){
        state.message = data;
    },

    SET_ERRORS(state, data){
        state.errorLogin = data;
    }
};

export default {
    namespaced: true, 
    state, 
    getters, 
    actions, 
    mutations
}
