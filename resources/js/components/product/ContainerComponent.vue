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
        <v-card >
            <v-col v-for="product in products" :key="product.id">
            <v-card-title class="teal darken-4" style="color: #fff">
                {{title}}
            </v-card-title>

            <v-container>
                <v-row class="mx-2">
                    <v-col cols="12" md="4" >
                        <v-text-field label="Nombre" v-model="product.nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field label="Precio" v-model="product.precio"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field label="Imagen" v-model="product.img"></v-text-field>
                    </v-col>
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
            </v-col>
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
            errorProduct: 0,
            product: {
                id: 0,
                nombre: '',
                precio: '',
                img: ''
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
        ...mapActions('products', ['saveProducts', 'updateProducts']),

        openModal(action, data) {
            switch (action) {
                case 'insert': {
                    this.actionType = 1
                    this.dialog = true
                    this.title = "Nuevo Producto"
                    this.errorMessage = []
                    this.errorProduct = 0
                    this.product.nombre = ""
                    this.product.precio = ""
                    this.product.img = ""
                    break;
                }
                case 'update': {
                    this.actionType = 2
                    this.dialog = true
                    this.title = "Editar Producto"
                    this.errorMessage = []
                    this.errorProduct = 0
                    this.product.nombre = data.nombre
                    this.product.precio = data.precio
                    this.product.img = data.img
                    this.product.id = data.id
                    break;
                }
            }
        },

        save() {
            this.errorMessage = [];
            this.saveProducts(this.product)
                .then(() => {
                    this.dialog = false
                    this.getProducts()
                }).catch((e) => {
                    this.errorMessage = e.response.data.errors;
                })
        },
        update() {
            this.updateProducts(this.product)
                .then(() => {
                    this.getProducts()
                    this.dialog = false
                }).catch((e) => {
                    this.errorMessage = e.response.data.errors;
                })
        },

    }
}
</script>
