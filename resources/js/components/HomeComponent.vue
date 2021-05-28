<template>
<v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
        <v-list dense>
            <v-list-item link color="#15638A">
                <v-list-item-action >
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-group :prepend-icon="model ? 'mdi-chevron-up' : 'mdi-chevron-down'" append-icon="" color="#15638A">
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>
                            Acceso
                        </v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item to="/users" link color="#15638A">
                    <v-list-item-action >
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Usuarios
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/products" link color="#15638A">
                    <v-list-item-action>
                        <v-icon>
                            mdi-dialpad
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Productos
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
              
            </v-list-group>
            <v-list-item link>
                <v-list-item-action>
                    <v-icon>mdi-power</v-icon>
                </v-list-item-action>
                <v-list-item-content @click="logout" >
                    <v-list-item-title>Log Out</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="teal darken-4" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-spacer />
    </v-app-bar>

    <v-main>
        <v-container>            
            <router-view></router-view>
        </v-container>
    </v-main>
    
    <v-footer app class="teal darken-4" dark>
        <span class="white--text">Enderson Yunda - &copy; 2021</span>
    </v-footer>
    
</v-app>

</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'

export default {
    props: {
        source: String,
    },

    data: () => ({
        token: '',
        dialog: false,
        drawer: true,
        model: false,
    }),

    computed:{
        //estas propiedaes se disparan en tiempo real
        ...mapState('users',['currenteUser']),
    },

     methods: {
        //aqui se llaman los modulos que se exportan en el store/index.js
        logout() {
            //login=es el modulo/ loginUsr=es la acción  ->store/modules/login            
            this.$store.dispatch('login/logoutUser');
        }
    },
    created(){
        //este se ejecuta mucho antes de cargar el componente
        if(localStorage.hasOwnProperty('blog_token')){            
            axios.defaults.headers.common['Authorization']='Bearer ' + localStorage.getItem('blog_token')
            this.token=localStorage.getItem('blog_token')
            this.$store.dispatch('users/getCurrent');
        }else{
            window.location.replace('login')
        }
    },
}
</script>
