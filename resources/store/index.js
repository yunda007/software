import Vue from "vue"
import Vuex from "vuex"

import login from "./modules/Login";
import users from "./modules/users";
import products from "./modules/products"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        users,
        products
    }
})
