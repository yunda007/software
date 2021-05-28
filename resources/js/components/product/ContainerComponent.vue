<template>
<div>

    <v-container>
    <v-item-group multiple>
        <v-row>
            <v-col v-for="product in products" :key="product.id" cols="12" sm="4" md="3">
                <v-card class="mx-auto" max-width="350" max-height="360">
                    <v-img width="120px" class="mx-auto"  height="130px" :src="product.img">
                    </v-img>

                    <v-card-subtitle class="pb-0 " style="color:black; height: 50px; font-size: 24px; overflow: hidden; padding: 10px 20px; color: black; font-weight: bold;">
                        {{product.nombre}}
                    </v-card-subtitle>
                    
                    <v-card-text style="color: black; font-weight: bold;">
                        <div>${{product.precio}}</div>
                    </v-card-text>

                    <v-card-actions style="justify-content: center !important;" >
                        <v-btn color="rgb(59,222,200)" dark text  @click="openModal('update')">
                            Editar
                            <v-icon dark right>
                                mdi-checkbox-marked-circle
                            </v-icon>
                        </v-btn>
                        <v-btn color="#7d33ff" dark text @click="openModal('update')">
                            Eliminar
                            <v-icon dark right>
                                mdi-cancel
                            </v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-item-group>
        </v-container>

    
    <v-btn color="green" bottom dark fab fixed right @click="openModal('insert')">
        <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!-- inicio dialog -->
    <v-dialog v-model="dialog" width="800">
        <v-card>
            <v-card-title class="teal darken-4" style="color: #fff">
                {{title}}
            </v-card-title>

            <v-container>
                <v-row class="mx-2">
                    <v-col cols="12" md="4">
                        <v-text-field label="Nombre" v-model="user.name"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field label="Email" v-model="user.email"></v-text-field>
                    </v-col>
                    <template v-if="actionType==1">
                        <v-col cols="12" md="4">
                            <v-text-field label="Password" v-model="user.password" :type="false ? 'text' : 'password'"></v-text-field>
                        </v-col>
                    </template>
                    <template v-else-if="actionType==2">
                        <v-col cols="12" md="4">
                            <v-select item-text="description" item-value="id" :items="listOptions" v-model="checkPassword" label="¿Desea cambiar contraseña?">
                            </v-select>
                        </v-col>

                        <v-col cols="12" md="4" v-if="checkPassword==1">
                            <v-text-field label="New Password" v-model="user.password" :type="false ? 'text' : 'password'"></v-text-field>
                        </v-col>
                    </template>

                </v-row>
                <div style="width: 90%; justify-content: center; margin: auto; color: red" v-for="(item, id) in errorMessage" :key="id">
                    <h6 class="text-center">{{item}}</h6>
                </div>
                <div class="text-error">{{message}}</div>
            </v-container>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="save()" v-if="actionType==1">
                    Guardar
                </v-btn>
                <v-btn color="primary" text @click="update()" v-if="actionType==2">
                    Actualizar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- fin dialog -->

</div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex'

export default {
    data() {
        return {
            actionType: 0,
            title: '',
            dialog: false,
            errorMessage: [],
            errorUser: 0,
            user: {
                id: 0,
                name: '',
                email: '',
                password: ''
            },
            listOptions: [{
                    id: 1,
                    description: 'Si'
                },
                {
                    id: 2,
                    description: 'No'
                },
            ],
            checkPassword: 2
        }
    },

    computed: {
        //esto esa para poder traer las variables del storee que devuelve la petición /store/modules/products
        ...mapState('products', ['products', 'message'])
    },

    mounted() {
        //esto para cuando se monte el componente
        this.$store.dispatch('products/getProducts');
    },

    methods: {

        //con esto se traen las aciones de /store/modules/products
        ...mapActions('users', ['getUsers', 'saveUser', 'updateUser']),

        openModal(action, data) {
            switch (action) {
                case 'insert': {
                    this.actionType = 1
                    this.dialog = true
                    this.title = "Nuevo Usuario"
                    this.errorMessage = []
                    this.errorUser = 0
                    this.user.name = ""
                    this.user.email = ""
                    this.user.password = ""
                    break;
                }
                case 'update': {
                    this.actionType = 2
                    this.dialog = true
                    this.title = "Editar Usuario"
                    this.errorMessage = []
                    this.errorUser = 0
                    this.user.name = data.name
                    this.user.email = data.email
                    this.user.password = data.password
                    this.user.id = data.id
                    break;
                }
            }
        },

        validate() {
            this.errorMessage = []
            this.errorUser = 0

            if (this.actionType == 1 || this.checkPassword == 1) {
                if (!this.user.password) {
                    this.errorMessage.push("Digite password de usuario")
                }
            }
            if (!this.user.name) {
                this.errorMessage.push("Digite nombre de usuario")
            }
            if (!this.user.email) {
                this.errorMessage.push("Digite email de usuario")
            }
            if (this.errorMessage.length) {
                this.errorUser = 1
            }
            return this.errorUser

        },
        save() {
            if (this.validate()) {
                return
            }

            this.errorMessage = [];
            this.saveUser(this.user)
                .then(() => {
                    this.dialog = false
                    this.getUsers()
                }).catch((e) => {
                    this.errorMessage = e.response.data.errors;
                })
        },
        update() {
            if (this.validate()) {
                return
            }
            this.updateUser(this.user)
                .then(() => {
                    this.getUsers()
                    this.dialog = false
                }).catch((e) => {
                    this.errorMessage = e.response.data.errors;
                })
        },

    }
}
</script>
