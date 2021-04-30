<template>
<v-app id="inspire">
    <v-main>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-12">
                        <v-toolbar class="teal darken-4" dark>
                            <v-toolbar-title>Formulario de Acceso</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <!-- v-model: es como el value en html -->
                                <v-text-field label="Email" name="Email" prepend-icon="mdi-email" type="text" v-model="user.email" /> <!-- Todo lo que escriba aqui se va almacenar en la data email -->
                                <v-text-field id="password" label="Password" name="password" prepend-icon="mdi-key" type="password" v-model="user.password" /> <!-- Todo lo que escriba aqui se va almacenar en la data password -->
                                <div class="text-error">{{message}}</div>
                                <div class="text-error" v-for="(error, index) in errorLogin" :key="index" v-text="error" > </div>
                            </v-form>
                        </v-card-text>
                        <!-- <pre>{{user}} </pre> -->
                        <v-card-actions>
                            <v-spacer />
                            <v-btn class="teal darken-4" dark @click="login">Ingresar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
import {
    mapState
} from 'vuex'

export default {
    // props: {
    //     source: String,
    // },
    data: () => ({
        //esto es para modificar la data a enviar en la petición
        user: {
            email: "",
            password: ""
        }
    }),

    computed: {
        //esto esa para llamar lo que ya está almacenada en el store
        ...mapState('login', ['message', 'errorLogin']),
    },

    methods: {
        //aqui se llaman los modulos que se exportan en el store/index.js
        login() {
            //login=es el modulo/ loginUsr=es la acción  ->store/module/login.js
            //this.user= es lo que esta en la data:()...son los parametros ()
            this.$store.dispatch('login/loginUsr', this.user);
        }
    }
}
</script>

<style>
.div-error {
    display: flex;
    justify-content: center;
}

.text-error {
    color: red !important;
    font-weight: bold;
    text-align: center;
}
</style>
