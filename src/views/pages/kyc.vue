<template>
<v-row>
  <v-col
    cols="12"
    class="mb-6"
  >
    <v-card>
      <v-card-title>
        KYC Gestión de Documentos
        <v-spacer />

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
              <template #[`item.imagen`]="{ item }">
                <div>
                    <img :src="item.imagen" fluid alt="Responsive image" width="50%" height="100%">
                    <!--img :src="'http://127.0.0.1:8000'+item.imagen" fluid alt="Responsive image" width="50%" height="100%"-->
                </div>
              </template>
              <template #[`item.juridico`]="{ item }">
                <v-icon dark color="primary" v-if="item.juridico === 'N'">
                  {{ icons.mdiAccountTie }}
                </v-icon>
                <v-icon dark color="primary" v-else>
                  {{ icons.mdiScaleBalance }}
                </v-icon>
              </template>
              <template #[`item.fecha_registro`]= "{ item }">
                  <span>{{ new Date(item.fecha_registro).toLocaleString() }}</span>
                </template>

              <template #[`item.estatus`]="{ item }">
                <v-icon dark color="primary" v-if="item.estatus === 'R'">
                  {{ icons.mdiTimerSand  }}
                </v-icon>
                <v-icon dark color="#0bf618"  v-if="item.estatus === 'A'">
                  {{ icons.mdiThumbUpOutline  }}
                </v-icon>
                <v-icon dark color="#E53935"  v-if="item.estatus === 'C'">
                  {{ icons.mdiFingerprintOff  }}
                </v-icon>
              </template>  
              <!--template #[`item.estatus`]="{ item }">
                  <v-switch
                    v-model="item.estatus"

                    @change="actualizarEstatus(item)"
                  />
              </template-->
      
              <template #[`item.acciones`]="{ item }">
                <v-btn
                  icon
                  dark
                  color="primary"
                  @click="openEditar(item)"
                >
                  <v-icon>{{ icons.mdiPencil }}</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>

    <!-- DIALOG EDITAR PAIS-->
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
          <v-toolbar-title class="white--text">Validar informacion KYC</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card-text>
            <v-row class="ma-0 pb-5 px-2">
              <v-col class="col-2">
                <div>
                    <!--img :src="'http://127.0.0.1:8000'+registro.imagen" fluid alt="Responsive image" width="100%" height="100%"-->
                    <img :src="registro.imagen" fluid alt="Responsive image" width="100%" height="100%">
                </div>
              </v-col>
              <v-col class="col-2">
                <span class="titulo h6-em"> Usuario</span>
                <h3 >{{ registro.observacion}}</h3>
              </v-col>
              <v-col class="col-1">
                <span class="titulo h6-em"> Entidad</span>
                  <v-icon dark color="primary" v-if="registro.juridico === 'N'">
                    {{ icons.mdiAccountTie }}
                  </v-icon>
                  <v-icon dark color="primary" v-else>
                    {{ icons.mdiScaleBalance }}
                  </v-icon>
              </v-col>
              <v-col class="col-3 ">            
                <v-select
                  v-model="registro.estatus"
                  :items="itemsOpcional"
                  item-text="text"
                  item-value="value"
                  label="Aprobación"
                  outlined
                  dense
                />
              </v-col>
              <v-btn
                block
                color="primary"
                class="mt-6"
                @click="dialog_edit = false, guardarEdicion()"
              >
                Guardar
              </v-btn>
              <v-row>
                <v-col cols="12" class="mb-6">
                  <v-card>
                    <v-card-title>
                      Detalle KYC del usuario
                      <v-spacer />
                    </v-card-title>
                    <v-card-text>
                      <v-row class="ma-0">
                        <v-col sm="12">
                          <v-data-table :headers="headersKYC" :items="dataKYC" :items-per-page="10" :search="search" class="elevation-1">
                            <template #[`item.imagen`]="{ item }" >
                              <div v-if="item.tipo==='I'">
                                <a :href="item.imagen">
                                  <img :src="item.imagen" fluid alt="Responsive image" width="70%" height="70%"  >
                                </a>
                              </div>
                            </template>
                            <template #[`item.acciones`]="{ item }">
                              <v-btn icon dark color="primary" @click="openEditarDoc(item)">
                                <v-icon>{{ icons.mdiPencil }}</v-icon>
                              </v-btn>
                            </template>
                          </v-data-table>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-row>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG EDITAR PAIS-->



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
  mdiTextBoxPlusOutline  ,
  mdiEarthPlus ,
  mdiCashPlus ,
  mdiCheckCircle,
  mdiCancel ,
  mdiScaleBalance,
  mdiAccountTie ,
  mdiTimerSand ,
  mdiFingerprintOff ,
  mdiThumbUpOutline ,
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
        { text: 'Id', value: 'id'},
        { text: 'País', value: 'imagen'},
        { text: 'Usuario', value: 'observacion'},
        { text: 'Jurídico', value: 'juridico'},
        { text: 'Fecha Registro', value: 'fecha_registro'},
        //{ text: 'Banco/Cuenta', value: 'banco_cuenta'},
        { text: 'Estatus', value: 'estatus'},
        { text: 'Acciones', value: 'acciones'},
      ],
      data:[],
      headersKYC: [
        { text: 'Documento', value: 'documento'},
        { text: 'Tipo', value: 'tipo'},
        { text: 'Texto', value: 'texto'},
        { text: 'imagen', value: 'imagen'},
      ],
      dataKYC:[],
      tipo: '',
      items: [
        { text: 'Imagen', value: 'I' },
        { text: 'Texto', value: 'T' },
      ],
      itemsOpcional: [
        { text: 'Revisión', value: 'R' },
        { text: 'Aprobada', value: 'A' },
        { text: 'Cancelada', value: 'C' },
      ],
      itemsJuridico: [
        { text: 'Natural', value: 'N' },
        { text: 'Jurídico', value: 'J' },
      ],   
      isPasswordVisible: false,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
        mdiAccountPlus,
        mdiClose,
        mdiPencil,
        mdiDelete,
        mdiTextBoxPlusOutline  ,
        mdiEarthPlus ,
        mdiCashPlus ,
        mdiCheckCircle,
        mdiCancel ,
        mdiScaleBalance,
        mdiAccountTie ,
        mdiTimerSand ,
        mdiFingerprintOff ,
        mdiThumbUpOutline ,
      },
      dialog_edit:false,
      dialogDoc: false,
      dialog_edit_Doc:false,
      id: '',
      nombre: '',
      coin: '',
      imagen: '',
      detalle:'',
      opcional:'',
      juridico:'',
      registro:{
        id:'',
        imagen:'',
        observacion:'',
        juridico:'',
        banco_cuenta:'',
        estatus:'',
        email:'',

      },
      registroDoc:{
        id:'',
        nombre:'',
        tipo:'',
        detalle:'',
        opcional:'',
        juridico:'',
      },
     // tipo: '',
      permisosUser: JSON.parse(localStorage.permisos),
      usersAdmin: [],
      dialogWait: false,
      dialogSure: false,
      dialogSureDoc: false,
      dataDelete: [],
      dataDeleteDoc: [],
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
    Preview_image() {
      if (this.registro.imagen){
        this.url= URL.createObjectURL(this.registro.imagen)
      }
      else{
        console.log(err)
        this.url = null
      }
    },
    fecthData () {
      this.dialogWait = true
      this.axios.get('/get-kyccabecera').then(response => {
          this.data = response.data
          this.dialogWait = false
        }).catch(err => {
          console.log(err)
        })
    },
    fecthDataDoc (id) {
      //this.axios.get('/kycdetalle/?kyccabecera='+id).then(response => {
      this.axios.get('/get-kycdetalle/'+id+'').then(response => {
          this.dataKYC = response.data
          console.log('lola2',this.dataKYC)
        }).catch(err => {
          console.log(err)
        })
    },
    uploadBandera(){
      const formData = new FormData()
      formData.append('imagen', this.registro.imagen)
      this.$axios.$patch('/paises/'+this.id+'/', formData,{
        headers: {"Content-Type": "multipart/form-data",},
      }).then((res)=>{
        this.$toast.success('Registro exitoso')
      }).catch((error) => {
        this.$toast.error('Error en el registro de dato')
        console.error(error)
      })
    },
    actualizarEstatus(item){     
      this.axios.patch('/kyccabecera/'+ item.id + '/', {'estatus':item.estatus}).then((res) => {
        console.log(res.data)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se actualizo el estatus correctamente'
        this.fecthData()
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error ' + err
      });
    },
    actualizarEstatusDoc(item){  
      this.axios.patch('/paisesdoc/'+ item.id + '/', {'habilitado':item.habilitado}).then((res) => {
        console.log(res.data)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se actualizo el estatus correctamente'
        this.fecthDataDoc(this.registro.id)
        
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error ' + err
      });
    },
    openEditar(item){
      console.log(item)
      this.dialog_edit = true
      this.registro.id = item.id
      this.registro.imagen = item.imagen
      this.registro.observacion = item.observacion
      this.registro.juridico = item.juridico
      this.registro.banco_cuenta= item.banco_cuenta
      this.registro.estatus= item.estatus
      this.registro.email= item.email
      this.registro.observacion= item.observacion
      this.fecthDataDoc(item.id)
    },
    openEditarDoc(item){
      console.log(item)
      this.dialog_edit_Doc = true
      this.registroDoc.id = item.id
      this.registroDoc.nombre = item.nombre
      this.registroDoc.tipo = item.tipo
      this.registroDoc.detalle = item.detalle
      this.registroDoc.opcional = item.opcional
      this.registroDoc.juridico = item.juridico
      this.registroDoc.habilitado = item.habilitado
    },
    guardarEdicion() {
        const formData = new FormData()
        formData.append('estatus', this.registro.estatus)
        this.axios.patch('/kyccabecera/'+ this.registro.id + '/', formData).then((res) => {
          formData.append('numero', this.registro.id)
          formData.append('email', this.registro.email)
          formData.append('user_kyc', this.registro.observacion)
          this.axios.put( '/SendEmailEstatusKYC', formData).then((resi)=>{
              console.log(resi)
            }).catch((error) => {
              console.error(error)
            })



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

  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
