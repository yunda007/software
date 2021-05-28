import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import users from '../js/components/user/ContainerComponent'
import products from '../js/components/product/ContainerComponent'

const routes=[
    {
        component:users,
        name:"users",
        path:"/users"
    },
    {
        component:products,
        name:"products",
        path:"/products"
    },
]

export default new VueRouter ({
    routes
}) 