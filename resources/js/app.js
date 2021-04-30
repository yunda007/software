require('./bootstrap');

window.Vue = require('vue');
import Vuetify from "../plugins/vuetify"
import store from "../store/"
import router from "../router/"
import axios from 'axios';

axios.defaults.baseURL="http://localhost/software/public/api"

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('home-component', require('./components/HomeComponent.vue').default);
Vue.component('login-component', require('./components/LoginComponent.vue').default);

const app = new Vue({
    el: '#app',
    vuetify: Vuetify,
    store,
    router
});

