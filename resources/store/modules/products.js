import axios from 'axios';

const state = {
    products: [],
    message: '',
    listProducts:[],
    currenteProducts:{},
    message:''
};

const getters = {};
const actions = {
    
    async getProducts({commit}, products){        
        console.log(products)
        const response = await axios.get("/products")
        commit('SET_DATA',response.data.products)
        
    },
    async saveProducts({commit}, products){        
        const response = await axios.post("/products/crear",
        {
            nombre: products.nombre,
            img:products.img,
            precio:products.precio,
        })
        commit('SET_DATA',response.data.products)
        
    },

    async updateProducts({commit}, products){        
        console.log(products)
        const response = await axios.put("/products/modificar",
        {
            nombre: products.nombre,
            img: products.img,
            id: products.id
        })
        commit('SET_DATA',response.data.products)
        
    }


};

const mutations = {
    //es para poder modificar las variables del state 
    SET_LISTPRODUCTS(state, data){
        state.listProducts = data;
    },
    SET_DATA(state, data){
        state.products = data;
    },
    SET_MESSAGE(state, data){
        state.message = data;
    },

};

export default {
    namespaced: true, 
    state, 
    getters, 
    actions, 
    mutations
}
