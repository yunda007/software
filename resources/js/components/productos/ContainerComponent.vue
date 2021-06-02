<template>
  <div>
    <v-container>
      <v-item-group multiple>
        <h2 style="color: black">Productos</h2>
        <v-row>
          <v-col
            v-for="product in getProductos"
            :key="product.id"
            cols="12"
            sm="5"
            md="3"
          >
            <v-card class="mx-auto" max-width="350" max-height="400">
              <v-img
                width="200px"
                class="mx-auto"
                height="200px"
                :src="product.img"
              ></v-img>

              <v-card-subtitle
                class="pb-0"
                style="
                  color: #000;
                  font-weight: bold;
                  padding-top: 0px;
                  padding-bottom: 0px;
                "
              >
                <div>{{ product.nombre }}</div>
              </v-card-subtitle>
              <br>
              <v-card-text
                style="
                  color: #000;
                  font-weight: bold;
                  padding-top: 0px;
                  padding-bottom: 0px;
                "
              >
                <div>Valor: {{ product.precio }}</div>
              </v-card-text>
              <v-card-actions style="justify-content: center !important">
                <v-btn
                  color="primary"
                  text
                  @click="openModal('update', product)"
                >
                  Editar
                  <v-icon
                    right
                  >
                    mdi-checkbox-marked-circle
                  </v-icon>
                </v-btn>
                <v-btn
                  color="red"
                  dark
                  v-if="product.active == 'on'"
                  text
                  @click="openModal('status', product)"
                >
                  Inactivar
                  <v-icon
                    dark
                    right
                  >
                    mdi-cancel
                  </v-icon>
                </v-btn>
                <v-btn
                  color="success"
                  v-else
                  dark
                  text
                  @click="openModal('status', product)"
                >
                  Activar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>

    <v-btn
      color="green"
      bottom
      fab
      fixed
      right
      @click="openModal('insert')"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!-- inicio dialog -->
    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title class="teal darken-4" style="color: #fff">
          {{ title }}
        </v-card-title>

        <v-container>
          <template
            v-if="positionModal == 'insert' || positionModal == 'update'"
          >
            <v-row>
              <v-col cols="12" sm="6">
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Nombre"
                    v-model="producto.nombre"
                  ></v-text-field>
                </v-col>
              </v-col>
              <v-col cols="12" sm="6">
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Imagen"
                    v-model="producto.imagen"
                  ></v-text-field>
                  <!-- <v-file-input accept="image/*" label="Imagen"></v-file-input> -->
                </v-col>
              </v-col>
              <v-col cols="12" sm="6">
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Precio"
                    type="number"
                    v-model="producto.precio"
                  ></v-text-field>
                </v-col>
              </v-col>
              
            </v-row>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="orange darken-2" text @click="validate">
                <v-icon> content-save </v-icon>
                Guardar
                <v-icon
                  large
                  color="orange darken-2"
                >
                  mdi-arrow-up-bold-box-outline
                </v-icon>
              </v-btn>
            </v-card-actions>
          </template>

          <template v-if="positionModal == 'status'">
            <h3>¿En realidad quieres cambiar el estado?</h3>

            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="updateStatus()"> Si </v-btn>
              <v-btn color="primary" text @click="dialog = !dialog"> No </v-btn>
            </v-card-actions>
          </template>

          <div
            style="
              width: 90%;
              justify-content: center;
              margin: auto;
              color: red;
            "
            v-for="(item, id) in errorMessage"
            :key="id"
          >
            <h6 class="text-center">{{ item }}</h6>
          </div>
          <div class="text-error">{{ getMessage }}</div>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- fin dialog -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      actionType: 0,
      title: "",
      dialog: false,
      errorMessage: [],
      errorUser: 0,
      producto: {
        id: 0,
        nombre: "",
        imagen: "",
        precio: 0,
        activate: "",
      },
      listOptions: [
        {
          id: 1,
          description: "Si",
        },
        {
          id: 2,
          description: "No",
        },
      ],
      checkPassword: 2,
      positionModal: "",
    };
  },

  computed: {
    //esto esa para poder traer las variables del storee que devuelve la petición /store/modules/products
    ...mapGetters("productos", ["getProductos", "getMessage", "getResponse"]),
  },

  watch: {
    getResponse() {
      this.dialog = !this.dialog;
      this.$store.dispatch("productos/getProductos");
    },
  },

  mounted() {
    //esto para cuando se monte el componente
    this.$store.dispatch("productos/getProductos");
  },

  methods: {
    //con esto se traen las aciones de /store/modules/products
    ...mapActions("users", ["getUsers", "saveUser", "updateUser"]),

    openModal(action, data) {
      switch (action) {
        case "insert": {
          this.positionModal = "insert";
          this.dialog = true;
          this.title = "Nuevo Producto";
          this.errorMessage = [];
          this.producto = {
            id: 0,
            nombre: "",
            imagen: "",
            precio: 0,
            activate: "on",
          };
          break;
        }
        case "update": {
          this.positionModal = "update";
          this.actionType = 2;
          this.dialog = true;
          this.title = "Editar Producto";
          this.errorMessage = [];
          this.producto = {
            id: data.id,
            nombre: data.nombre,
            imagen: data.img,
            precio: data.precio,
            activate: data.active,
          };
          break;
        }
        case "status": {
          this.dialog = true;
          this.positionModal = "status";
          this.title = "Editar Estado";
          this.errorMessage = [];
          this.producto.id = data.id
          this.producto.activate = data.active == 'on' ? 'false' : 'on'
          break;
        }
      }
    },

    validate() {
      this.errorMessage = [];
      if (
        this.producto.nombre.length > 0 &&
        this.producto.imagen.length > 0 &&
        this.producto.precio.length > 0
      ) {
        if (this.positionModal === "insert")
          this.$store.dispatch("productos/saveProducto", this.producto);
        if (this.positionModal === "update")
          this.$store.dispatch("productos/updateProduct", this.producto);
      } else {
        if (!this.producto.nombre.length > 0)
          this.errorMessage.push("El campo nombre es requerido");
        if (!this.producto.imagen.length > 0)
          this.errorMessage.push("El campo imagen es requerido");
        if (!this.producto.precio.length > 0)
          this.errorMessage.push("El campo precio es requerido");
      }
    },
    updateStatus() {
      this.$store.dispatch("productos/updateStatus", { id: this.producto.id, activate: this.producto.activate })
    }
  },
};
</script>
