import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import users from '../js/components/user/ContainerComponent'

const routes=[
    {
        component:users,
        name:"users",
        path:"/users"
    },
]

export default new VueRouter ({
    routes
}) 