<template>
<div>
    <v-container>
        <v-simple-table fixed-header height="300px">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            Opciones
                        </th>
                        <th class="text-left">
                            Nombre
                        </th>
                        <th class="text-left">
                            Email
                        </th>
                        <th class="text-left">
                            Creación
                        </th>
                        <th class="text-left">
                            Actualización
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listUsers" :key="item.id">
                        <td style="width:170px;">
                            <v-btn @click="openModal('update', item)">
                                <v-icon @click="openModal('update', item)" color="green">mdi-pencil-outline</v-icon>
                            </v-btn>
                            <v-btn>
                                <v-icon color="red">mdi-delete-sweep-outline</v-icon>
                            </v-btn>
                        </td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.created_at }}</td>
                        <td>{{ item.updated_at }}</td>                        
                    </tr>
                </tbody>
                <pre> {{dataResponse}} </pre>

            </template>
        </v-simple-table>
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
import axios from 'axios'

export default {
    data() {
        return {
            actionType: 0,
            title: '',
            dialog: false,
            errorMessage: [],
            errorUser:0,
            user: {
                id:0,
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
        //esto esa para poder traer la iformación que devuelve la petición /store/module/users/getUsers
        ...mapState('users', ['listUsers', 'message', 'dataResponse'])
    },

    mounted() {
        //esto para cuando se monte el componente
        this.$store.dispatch('users/getUsers');
    },

    methods: {
        ...mapActions('users', ['getUsers', 'saveUser','updateUser']),

        openModal(action, data) {
            switch (action) {
                case 'insert': {
                    this.actionType = 1
                    this.dialog = true
                    this.title = "Nuevo Usuario"
                    this.errorMessage=[]
                    this.errorUser=0
                    this.user.name = ""
                    this.user.email = ""
                    this.user.password = ""
                    break;
                }
                case 'update': {
                    this.actionType = 2
                    this.dialog = true
                    this.title = "Editar Usuario"
                    this.errorMessage=[]
                    this.errorUser=0                    
                    this.user.name = data.name
                    this.user.email = data.email
                    this.user.password = data.password
                    this.user.id= data.id
                    break;
                }
            }
        },

        validate(){
            this.errorMessage=[]
            this.errorUser=0

            if (this.actionType==1 || this.checkPassword==1) {
                if(!this.user.password){this.errorMessage.push("Digite password de usuario")}
            }
            if(!this.user.name){this.errorMessage.push("Digite nombre de usuario")}
            if(!this.user.email){this.errorMessage.push("Digite email de usuario")}
            if(this.errorMessage.length){this.errorUser=1}
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
        update(){
            if (this.validate()) {
                return
            }
            this.updateUser(this.user)
            .then(()=>{
                this.getUsers()
                this.dialog=false
            }).catch((e) => {
                this.errorMessage = e.response.data.errors;
            })
        },


    }
}
</script>
