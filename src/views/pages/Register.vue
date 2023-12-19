<template>
<v-row>
  <v-col
    cols="12"
    class="mb-6"
  >
    <v-card>
      <v-card-title>
        Listado de usuarios
        <v-spacer />
        <v-btn
          icon
          @click="dialog = true"
        >
          <v-icon
            dark
            color="primary"
            v-if="usersAdmin.escribir"
          >
            {{ icons.mdiAccountPlus }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row class="ma-0">
          <v-col
            sm="12" 
          >
            <v-data-table
              :headers="headers"
              :items="data"
              :items-per-page="10"
              :search="search"
              class="elevation-1"
            >
              <template #[`item.tipo`]="{ item }">
                  <v-chip
                  v-if="item.tipo === 'A'"
                  color="primary"
                  >
                  Administrador
                  </v-chip>
                  <v-chip
                  v-if="item.tipo === 'B'"
                  color="accent"
                  >
                  Banco
                  </v-chip>
                  <v-chip
                  v-if="item.tipo === 'S'"
                  color="warning"
                  >
                  Super
                  </v-chip>

                  <v-chip
                  v-if="item.tipo === 'U'"
                  color="info"
                  >
                  Usuario
                  </v-chip>
              </template>

              <template #[`item.activo`]="{ item }">
                  <v-switch
                    v-model="item.activo"
                    :disabled="!usersAdmin.actualizar"
                    @change="actualizarEstatus(item)"
                  />
              </template>
      
              <template #[`item.acciones`]="{ item }">
                <v-btn
                  icon
                  dark
                  color="primary"
                  v-show="usersAdmin.actualizar"
                  @click="openEditar(item)"
                >
                  <v-icon>{{ icons.mdiPencil }}</v-icon>
                </v-btn>
                <v-btn
                  icon
                  dark
                  color="#E53935"
                  v-show="usersAdmin.borrar"
                  @click="openDelete(item)"
                >
                  <v-icon>{{ icons.mdiDelete }}</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
    <!-- DIALOG CREAR -->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            dark
            icon
            class="white--text"
            @click="dialog = false"
          >
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Crear nuevo usuario</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card-text>
            <v-row class="ma-0 pb-5 px-2">
              <v-col class="col-6">
                <v-text-field
                  v-model="username"
                  outlined
                  label="Username"
                  placeholder="JohnDoe"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>
              <v-col class="col-6">
                <v-text-field
                  v-model="email"
                  outlined
                  label="Email"
                  placeholder="john@example.com"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>
              <v-col class="col-6">
                <v-text-field
                  v-model="password"
                  outlined
                  :type="isPasswordVisible ? 'text' : 'password'"
                  label="Password"
                  placeholder="············"
                  :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                  hide-details
                  @click:append="isPasswordVisible = !isPasswordVisible"
                  class="mb-3"
                  dense
                />
              </v-col>
              <v-col class="col-6 mb-0">
                <v-select
                  v-model="tipo"
                  :items="items"
                  item-text="text"
                  item-value="value"
                  label="Tipo de usuario"
                  outlined
                  dense
                />
              </v-col>
              
              <div class="container mt-0">
                <h2 class="text-h6 font-weight-semibold mb-2">
                  Conceder permisos
                </h2>

                <v-expansion-panels accordion>
                  <v-expansion-panel
                    v-for="(item,i) in permisos"
                    :key="i"
                  >
                    <v-expansion-panel-header>
                      {{ item.nombre }}
                      <v-spacer></v-spacer>
                      <v-switch
                        v-model="item.todo"
                        label="Todos"
                        color="primary"
                        hide-details
                        @click="!item.todo, marcarTodos(item)"
                      ></v-switch>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-switch
                        v-model="item.leer"
                        label="Leer"
                        color="primary"
                        hide-details
                        @click="!item.leer"
                      ></v-switch>
                      <v-switch
                        v-model="item.escribir"
                        label="Escrbir"
                        color="primary"
                        hide-details
                        @click="!item.escribir"
                      ></v-switch>
                      <v-switch
                        v-model="item.borrar"
                        label="Borrar"
                        color="primary"
                        hide-details
                        @click="!item.borrar"
                      ></v-switch>
                      <v-switch
                        v-model="item.actualizar"
                        label="Actualizar"
                        color="primary"
                        hide-details
                        @click="!item.actualizar"
                      ></v-switch>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
              <v-btn
                block
                color="primary"
                class="mt-6"
                @click="dialog = false, createUser()"
              >
                Guardar
              </v-btn>
            </v-row>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG CREAR -->

    <!-- DIALOG EDITAR -->
    <v-dialog
      v-model="dialog_edit"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          color="primary"
        >
          <v-btn
            dark
            icon
            class="white--text"
            @click="dialog_edit = false"
          >
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Edición de usuario</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card-text>
            <v-row class="ma-0 pb-5 px-2">
              <v-col class="col-6">
                <v-text-field
                  v-model="registro.username"
                  outlined
                  label="Username"
                  placeholder="JohnDoe"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>
              <v-col class="col-6">
                <v-text-field
                  v-model="registro.email"
                  outlined
                  label="Email"
                  placeholder="john@example.com"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>
              <v-col class="col-6 mb-0">
                <v-select
                  v-model="registro.tipo"
                  :items="items"
                  item-text="text"
                  item-value="value"
                  label="Tipo de usuario"
                  outlined
                  dense
                />
              </v-col>
              <v-col class="col-6 mb-0">
                <v-switch
                  v-model="registro.activo"
                  label="El usuario esta activo?"
                  outlined
                  dense
                />
              </v-col>

              <div class="container mt-0">
                <h2 class="text-h6 font-weight-semibold mb-2">
                  Opciones de permisos
                </h2>

                <v-expansion-panels accordion>
                  <v-expansion-panel
                    v-for="(item,i) in registro.permisos"
                    :key="i"
                  >
                    <v-expansion-panel-header>
                      {{ item.modulo }}
                      <v-spacer></v-spacer>
                      <v-switch
                        v-model="item.todo"
                        label="Todos"
                        color="primary"
                        hide-details
                        @click="!item.todo, marcarTodos(item)"
                      ></v-switch>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-switch
                        v-model="item.leer"
                        label="Leer"
                        color="primary"
                        hide-details
                        @click="!item.leer"
                      ></v-switch>
                      <v-switch
                        v-model="item.escribir"
                        label="Escrbir"
                        color="primary"
                        hide-details
                        @click="!item.escribir"
                      ></v-switch>
                      <v-switch
                        v-model="item.borrar"
                        label="Borrar"
                        color="primary"
                        hide-details
                        @click="!item.borrar"
                      ></v-switch>
                      <v-switch
                        v-model="item.actualizar"
                        label="Actualizar"
                        color="primary"
                        hide-details
                        @click="!item.actualizar"
                      ></v-switch>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
              <v-btn
                block
                color="primary"
                class="mt-6"
                @click="dialog_edit = false, guardarEdicion()"
              >
                Guardar
              </v-btn>
            </v-row>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG EDITAR -->

    <!-- DIALOG DE CARGA -->
    <v-dialog
      v-model="dialogWait"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Por favor espere
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG DE CARGA -->

    <!-- DIALOG DELETE SURE -->
    <v-dialog
      v-model="dialogSure"
      max-width="290"
      transition="dialog-top-transition"
    >
      <v-card>
        <v-card-title class="text-h5">
          <span class="red--text text--lighten-1">Eliminar registro</span>
          
        </v-card-title>

        <v-card-text>
          Esta seguro que va a eliminar este registro?
          <p>No podra recuperarlo</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="#E53935"
            text
            @click="eliminar(item)"
          >
            Eliminar
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialogSure = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- DIALOG DELETE SURE -->
    <!-- SNACKBAR MENSAJES -->
    <v-snackbar
      v-model="snackbar"
      right
      top
      absolute
      :color="color"
      :multi-line="multiLine"
      elevation="24"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    <!-- FIN SNACKBAR -->
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiAccountPlus,
  mdiEyeOutline,
  mdiEyeOffOutline,
  mdiClose,
  mdiPencil,
  mdiDelete,
  } from '@mdi/js'
import { ref } from '@vue/composition-api'

export default {
  data() {
    return {
      snackbar: false,
      text: '',
      color: '',
      search: '',
      headers: [
        { text: 'Usuario', value: 'username', },
        { text: 'Correo', value: 'email' },
        { text: 'Tipo', value: 'tipo' },
        { text: 'Estatus', value: 'activo' },
        { text: 'Acciones', value: 'acciones' },
      ],
      data:[],
      isPasswordVisible: false,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
        mdiAccountPlus,
        mdiClose,
        mdiPencil,
        mdiDelete,
      },
      dialog: false,
      dialog_edit:false,
      username: '',
      email: '',
      password: '',
      registro:{
        username:'',
        email:'',
        permisos: [],
      },
      tipo: '',
      items: [
        { text: 'Super Administrador', value: 'S' },
        { text: 'Administrador', value: 'A' },
        { text: 'Usuario', value: 'U' },
        { text: 'Banco', value: 'B' },
      ],
      permisos: [
        {
          nombre: "UsuariosDefix",
          leer: false,
          escribir: false,
          borrar: false,
          actualizar: false,
          todo: false,
        },
        {
          nombre: "Transacciones",
          leer: false,
          escribir: false,
          borrar: false,
          actualizar: false,
          todo: false,
        },
        {
          nombre: "Balance",
          leer: false,
          escribir: false,
          borrar: false,
          actualizar: false,
          todo: false,
        },
        {
          nombre: "UsersAdmin",
          leer: false,
          escribir: false,
          borrar: false,
          actualizar: false,
          todo: false,
        },
        {
          nombre: "Comisiones",
          leer: false,
          escribir: false,
          borrar: false,
          actualizar: false,
          todo: false,
        },
      ],
      permisosUser: JSON.parse(localStorage.permisos),
      usersAdmin: [],
      dialogWait: false,
      dialogSure: false,
      dataDelete: [],
    }
  },
  mounted() {
    this.permisosUser.forEach(i => {
      if (i.modulo === 'UsersAdmin') {
        this.usersAdmin = i
      }
    })
    console.log(this.usersAdmin)
    this.fecthData()
  },
  methods: {
    fecthData () {
      this.dialogWait = true
      this.axios.get('/get-users-admin').then(response => {
          this.data = response.data
          this.dialogWait = false
        }).catch(err => {
          console.log(err)
        })
    },
    marcarTodos (item) {
      // item.todo = !item.todo
      if (item.todo === true) {
        item.leer = true
        item.escribir = true
        item.borrar = true
        item.actualizar = true
      } else {
        item.leer = false
        item.escribir = false
        item.borrar = false
        item.actualizar = false
      }
      console.log(item)
    },
    createUser () {
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
        tipo: this.tipo,
        permisos: this.permisos,
      }
      console.log(data)
      this.axios.post('/crear-usuario/', data).then((res) => {
        console.log(res.data)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se guardo correctamente'
        this.fecthData()
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error' + err
      });
    },
    actualizarEstatus(item){
      this.axios.patch('/perfiles/' + item.id + '/', {'activo':item.activo}).then((res) => {
        console.log(res.data)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se actualizo el estatus correctamente'
        this.fecthData()
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error' + err
      });
    },
    openEditar(item){
      console.log(item)
      this.dialog_edit = true
      this.registro.id = item.id
      this.registro.username = item.username
      this.registro.tipo = item.tipo
      this.registro.email = item.email
      this.registro.activo = item.activo
      this.registro.permisos = item.permisos
    },
    guardarEdicion () {
      this.axios.put('/act-user-admin', {'datos':this.registro}).then((res) => {
        this.registro = {
          username:'',
          email:'',
          permisos:[]
        }
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se actualizo correctamente'
        this.fecthData()
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error' + err
      });
    },
    openDelete (item) {
      this.dataDelete = item
      this.dialogSure = true
    },
    eliminar () {
      this.dialogSure = false
      this.axios.delete('https://develop.globaldv.tech/zesions_backend/api/v1/usuarios/' + this.dataDelete.id + '/').then(res => {
      //this.axios.delete('http://127.0.0.1:8000/api/v1/usuarios/' + this.dataDelete.id + '/').then(res => {
        console.log(res)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se elimino correctamente'
        this.fecthData()
      }).catch(err => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error' + err
      })
    }
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
