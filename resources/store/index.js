import Vue from "vue"
import Vuex from "vuex"

import login from "./modules/Login";
import users from "./modules/users";
import productos from "./modules/productos"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        users,
        productos
    }
})
