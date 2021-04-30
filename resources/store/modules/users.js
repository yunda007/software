import axios from 'axios';


const state = {
    dataResponse:{},
    listUsers:[],
    currenteUser:{},
    message:''
};

const getters = {};
const actions = {

    getUsers({commit}){
        axios.get('/user/users')
        .then ( response => {
            commit('SET_LISTUSERS', response.data.users)
        });
    },

    getCurrent({commit}){
        axios.get('/user/current') 
        .then ( response => {            
            commit('SET_CURRENTUSER',response.data.user)
        });        
    },


    async saveUser({commit}, user){        
        const response = await axios.post("/user/store",
        {
            name: user.name,
            email:user.email,
            password:user.password,            
        })
        commit('SET_DATA',response.data.user)
        
    },

    async updateUser({commit}, user){        
        console.log(user)
        const response = await axios.put("/user/update",
        {
            name: user.name,
            email:user.email,
            password:user.password,
            id: user.id
        })
        commit('SET_DATA',response.data.user)
        
    }


};

const mutations = {
    //es para poder modificar las variables del state 
    SET_LISTUSERS(state, data){
        state.listUsers = data;
    },
    SET_DATA(state, data){
        state.dataResponse = data;
    },
    SET_CURRENTUSER(state, data){
        state.currenteUser = data;
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
