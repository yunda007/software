import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import users from '../js/components/user/ContainerComponent'
import productos from '../js/components/productos/ContainerComponent'

const routes=[
    {
        component:users,
        name:"users",
        path:"/users", 
    },
    {
        component:productos,
        name:"productos",
        path:"/productos"
    }
]

export default new VueRouter ({
    routes
}) 