import axios from 'axios';

const state = {
    productos: [],
    message: '',
    response: ''
};

const getters = {
    getProductos(state) { return state.productos },
    getMessage(state) { return state.message },
    getResponse(state) { return state.response }
}

const actions = {    
    async getProductos({ commit }) {        
        const response = await axios.get("/productos")
        commit('SET_PRODUCTOS', response.data.productos)
    },
    
    async saveProducto({ commit }, producto) {
        const response = await axios.post("/productos", producto)
        commit('SET_RESPONSE', response.data)
    },

    async updateProduct({ commit }, producto) {
        const response = await axios.put("/productos", producto)
        commit('SET_RESPONSE', response.data)
    },

    async updateStatus({ commit }, producto){
        const response = await axios.put("/productos/status", producto)
        commit('SET_RESPONSE', response.data)
    }
};

const mutations = {
    SET_PRODUCTOS(state, data) { state.productos = data },
    SET_RESPONSE(state, data) { state.response = data }
};

export default {
    namespaced: true, 
    state, 
    getters, 
    actions, 
    mutations
}
