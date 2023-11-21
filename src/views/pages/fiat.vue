<template>
  <v-row>
    <v-col cols="12" class="mb-6">
      <v-card>
        <v-card-title>
          Fiat Gestión de solicitudes
          <v-spacer />

        </v-card-title>

        <v-row class="ma-0 pb-5 px-2">
          <v-col class="col-12 col-sm-4 mb-0">
            <v-text-field v-model="search" label="Buscar" rounded dense outlined />
          </v-col>
          <v-col class="col-12 col-sm-2 mb-0">
            <v-text-field type="date" v-model="from_date" label="Fecha desde" rounded dense outlined />
          </v-col>
          <v-col class="col-12 col-sm-2 mb-0">
            <v-text-field type="date" v-model="to_date" label="Fecha hasta" rounded dense outlined />
          </v-col>
          <v-col class="col-12 col-sm-4 mb-0">
            <v-btn class="mr-2" color="primary" @click="date()">Buscar</v-btn>
            <v-btn class="mr-2" color="primary" @click="exportaFiat()">Exportar</v-btn>
            <v-btn fab small color="primary" @click="$router.go()">
              <v-icon>
                {{ orbit }}
              </v-icon>
            </v-btn>
        
          </v-col>
        </v-row>

        <v-card-text>
          <v-row class="ma-0">
            <v-col sm="12">
              <v-data-table :headers="headers" :items="data" :items-per-page="10" :search="search" class="elevation-1"
                sort-by="item.id">
                <template #[`item.imagen`]="{ item }">
                  <div>
                    <!--img :src="'http://127.0.0.1:8000' + item.imagen" fluid alt="Responsive image" width="80%" height="100%"-->
                    <img :src="item.imagen" fluid alt="Responsive image" width="80%" height="100%">
                  </div>
                </template>
                <template #[`item.accion`]="{ item }">
                  <v-chip v-if="item.accion === 'C'" color="primary">
                    Compra
                  </v-chip>
                  <v-chip v-if="item.accion === 'V'" color="accent">
                    Venta
                  </v-chip>
                </template>

                <template #[`item.fecha_creado`]= "{ item }">
                  <span>{{ new Date(item.fecha_creado).toLocaleString() }}</span>
                </template>

                <template #[`item.estatus`]="{ item }">
                  <h3 v-if="item.estatus === '1'" style="color:blue !important">
                   Creado
                  </h3>
                  <h3 v-if="item.estatus === '2'" style="color:orange !important">
                    Asignado
                  </h3>
                  <h3 v-if="item.estatus === '3'" style="color:blue !important">
                    Procesado
                  </h3>

                  <h3 v-if="item.estatus === '4'" style="color:green !important">
                    Completado
                  </h3>
                  <h3 v-if="item.estatus === '5'" style="color:red !important">
                    Cancelado
                  </h3>
                </template>
                <template #[`item.acciones`]="{ item }">
                  <v-btn icon dark color="primary" @click="openEditar(item)">
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
    <v-dialog v-model="dialog_edit" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar color="primary">
          <v-btn dark icon class="white--text" @click="dialog_edit = false">
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Gestionar estatus de la solicitud</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card-text>
            <v-row class="ma-0 pb-5 px-2">
              <v-col class="col-2">
                <div>
                  <img :src="registro.imagen" fluid alt="Responsive image" width="100%"  height="100%">
                  <!--img :src="'http://127.0.0.1:8000' + registro.imagen" fluid alt="Responsive image" width="100%"  height="100%"-->
                </div>
              </v-col>

              <v-col class="col-2">
                <span class="titulo h6-em"> Usuario</span>
                <h3>{{ registro.observacion }}</h3>
              </v-col>
              <v-col class="col-2 ">
                <span class="titulo h6-em">Estatus</span>
                <h3 v-if="registro.estatus === '1'" style="color:blue !important">
                  Creado
                </h3>
                <h3 v-if="registro.estatus === '2'" style="color:orange !important">
                  Asignado
                </h3>
                <h3 v-if="registro.estatus === '3'" style="color:blue !important">
                  Procesado
                </h3>

                <h2 v-if="registro.estatus === '4'" style="color:green !important">
                  Completado
                </h2>
                <h3 v-if="registro.estatus === '5'" style="color:red !important">
                  Cancelado
                </h3>
              </v-col>
              <v-col class="col-1">
                <span class="titulo h6-em">Acción</span>
                <h3 v-if="registro.accion === 'C'" color="primary">
                  Compra
                </h3>
                <h3 v-if="registro.accion === 'V'" color="accent">
                  Venta
                </h3>
              </v-col>
              <v-col class="col-2">
                <span class="titulo h6-em"> Referencia</span>
                <h3>{{ registro.referencia }}</h3>
              </v-col>
              <v-col class="col-1">
                <span class="titulo h6-em"> Cripto</span>
                <h3>{{ registro.cripto }}</h3>
              </v-col>
              <v-col class="col-2">
                <span class="titulo h6-em"> Tasa</span>
                <h3>{{ parseFloat(registro.tasa).toFixed(2) }}</h3>
              </v-col>
              <v-col class="col-1">
                <span class="titulo h6-em"> Cantidad <br>{{ registro.cripto }}</span>
                <h3>{{ registro.cantidad }}</h3>
              </v-col>
              <v-col class="col-1">
                <span class="titulo h6-em"> Monto <br>{{ registro.coin }}</span>
                <h3>{{ parseFloat(registro.monto).toFixed(2) }}</h3>
              </v-col>
              <v-col class="col-2">
                <span class="titulo h6-em"> Banco</span>
                <h3>{{ registro.banco_nombre }}</h3>
              </v-col>
              <v-col class="col-2">
                <span class="titulo h6-em"> Tipo de Pago</span>
                <h3>{{ registro.tipopago_nombre }}</h3>
              </v-col>
              <v-col class="col-2">
                <span class="titulo h6-em"> Titular</span>
                <h3>{{ registro.titular }}</h3>
              </v-col>
              <v-col class="col-2">
                <span class="titulo h6-em"> Cédula</span>
                <h3>{{ registro.cedula }}</h3>
              </v-col>
              <v-col class="col-2">
                <span class="titulo h6-em"> Teléfono</span>
                <h3>{{ registro.telefono }}</h3>
              </v-col>
              <v-col class="col-4">
                <span class="titulo h6-em"> Número de Cuenta</span>
                <h3>{{ registro.numerocuenta }}</h3>
              </v-col>
              <!--v-col class="col-4">
                <span class="titulo h6-em"> Tipo de Cuenta</span>
                <h3 >{{ registro.tipocuenta}}</h3>
              </!--v-col-->



              <v-col class="col-3">
                <span class="titulo h6-em"> Fecha Creado</span>
                <h3>{{ (new Date(registro.fecha_creado)).toLocaleString() }}</h3>
              </v-col>

              <v-col class="col-5">
                <span class="titulo h6-em"> WALLET</span>
                <h3>{{ registro.wallet }}</h3>
              </v-col>

              <v-row>

                <v-col class="col-3" v-if="habilitar.opcion2">
                  <template>
                    <v-col class="col-4 mb-0">
                      <v-btn color="primary" class="mt-6" @click="registro.estatus = '2', actualizarEstatus(registro)"
                        :disabled="habilitar.boton2">
                        Asignar
                      </v-btn>
                    </v-col>
                  </template>
                  <span class="titulo h6-em"> Fecha Asignado</span>
                  <h3 v-if="registro.fecha_asignado">{{ (new Date(registro.fecha_asignado)).toLocaleString() }}</h3>
                  <v-text-field v-model="registro.usuario_asignado" outlined label="Usuario Asignado"
                    placeholder="Asignado a..." hide-details class="mb-3" dense />
                </v-col>

                <v-col class="col-3" v-if="habilitar.opcion3">
                  <template>
                    <v-col class="col-4 mb-0">
                      <v-btn color="primary" class="mt-6" @click="registro.estatus = '3', actualizarEstatus(registro)"
                        :disabled="habilitar.boton3">
                        Procesar
                      </v-btn>
                    </v-col>
                  </template>
                  <span class="titulo h6-em"> Fecha Procesado</span>
                  <h3 v-if="registro.fecha_procesado">{{ (new Date(registro.fecha_procesado)).toLocaleString() }}</h3>
                </v-col>

                <v-col class="col-3" v-if="habilitar.opcion4">
                  <template>
                    <v-col class="col-4 mb-0">
                      <v-btn color="primary" class="mt-6" @click="registro.estatus = '4', actualizarEstatus(registro)"
                        :disabled="habilitar.boton4">
                        Completada
                      </v-btn>
                    </v-col>
                  </template>
                  <span class="titulo h6-em"> Fecha Completado</span>
                  <h3 v-if="registro.fecha_completado">{{ (new Date(registro.fecha_completado)).toLocaleString() }}</h3>
                </v-col>

                <v-col class="col-3" v-if="habilitar.opcion5">
                  <template>
                    <v-col class="col-4 mb-0">
                      <v-btn color="primary" class="mt-6" @click="registro.estatus = '5', actualizarEstatus(registro)"
                        :disabled="habilitar.boton5">
                        Anulada
                      </v-btn>
                    </v-col>
                  </template>
                  <span class="titulo h6-em"> Fecha Anulado</span>
                  <h3 v-if="registro.fecha_anulado">{{ (new Date(registro.fecha_anulado)).toLocaleString() }}</h3>
                </v-col>
              </v-row>

            </v-row>


            <v-col class="col-6">
              <span class="titulo h6-em">Archivo Adjunto</span>
              <div v-if="registro.adjuntofiat === 'vacio'">
                <div v-if="registro.accion === 'V'">
                  <v-col class="col-12 mb-0">
                    <v-row>
                      <v-col md="10">
                        <v-file-input @change="uploadBandera(registro)" v-model="registro.adjuntofiat" accept="image/*"
                          label="Cargar Adjunto" />
                      </v-col>
                    </v-row>
                  </v-col>
                </div>
              </div>
              <div v-else>
                <img :src="registro.adjuntofiat" fluid alt="Responsive image" width="100%" height="100%">
                <!--img :src="'http://127.0.0.1:8000'+registro.adjuntofiat" fluid alt="Responsive image" width="100%" height="100%"-->
              </div>
            </v-col>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG EDITAR PAIS-->




    <!-- DIALOG DE CARGA -->
    <v-dialog v-model="dialogWait" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Por favor espere
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG DE CARGA -->


    <!-- SNACKBAR MENSAJES -->
    <v-snackbar v-model="snackbar" right top absolute :color="color" :multi-line="multiLine" elevation="24">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
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
  mdiOrbitVariant,
  } from '@mdi/js'
import { ref } from '@vue/composition-api'

export default {
  data() {
    return {
      orbit: mdiOrbitVariant,
      from_date: '2022-01-01',
      to_date: '2022-12-31',
      snackbar: false,
      text: '',
      color: '',
      search: '',
      headers: [
        //{ text: 'Id', value: 'id'},
        { text: 'Referencia', value: 'referencia'},
        { text: 'País', value: 'imagen'},
        { text: 'Usuario', value: 'observacion'},
        { text: 'Operación', value: 'accion'},
        { text: 'Fecha Creado', value: 'fecha_creado',dataType: "Date"},
        { text: 'Cripto', value: 'cripto'},
        { text: 'Cantidad Cripto', value: 'cantidad',  align: 'right'},
        { text: 'Tasa', value: 'tasa',  align: 'right'},
        { text: 'Monto Fiat', value: 'monto',  align: 'right'},
        { text: 'Estatus', value: 'estatus'},
        { text: 'Acciones', value: 'acciones'},
      ],
      data:[],
      datat:[],
      dataestatusfiat:[],
      habilitar:{
        boton2:true,
        boton3:true,
        boton4:true,
        boton5:false,
        opcion2:false,
        opcion3:false,
        opcion4:false,
        opcion5:true,
      },
  
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
        estatus:'',
        observacion:'',
        accion:'',
        referencia:'',
        pais:'',
        cripto:'',
        tasa:'',
        comision:'',
        cantidad:'',
        monto:'',
        banco:'',
        banco_nombre:'',
        tipopago:'',
        tipopago_nombre:'',
        titular:'',
        cedula:'',
        telefono:'',
        numerocuenta:'',
        tipocuenta:'',
        usuario:'',
        fecha_creado:'',
        fecha_asignado:'',
        usuario_asignado:'',
        fecha_procesado:'',
        fecha_completado:'',
        fecha_anulado:'',
        coin:'',
        wallet:'',
        estatus2:false,
        estatus3:false,
        estatus4:false,
        estatus5:false,
      },
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
    uploadBandera(item){
      const formData = new FormData()
      formData.append('adjuntofiat', item.adjuntofiat)
      this.axios.patch('/FiatTransaccion/'+item.id+'/', formData,{
        headers: {"Content-Type": "multipart/form-data",},
      }).then((res)=>{
        console.log(res)
        this.$toast.success('Registro exitoso')
        this.modalAdjunto= false
        this.fecthDatahistorico(this.user) 
      }).catch((error) => {
        this.$toast.error('Error en el registro de dato',error)
        console.error(error)
      })
    },
    fecthData () {
      this.dialogWait = true
      this.axios.get('/get-fiat').then(response => {
          this.data = response.data
          this.datat = this.data
          this.dialogWait = false

        }).catch(err => {
          console.log(err)
        })
    },
    EstatusFiat () {
      this.dialogWait = true
      this.axios.get('/get-fiat-estatus/'+this.registro.id+'').then(response => {
          this.dataestatusfiat = response.data
          this.dialogWait = false
          //this.item.estatus=this.dataestatusfiat.estatus
          //this.registro.fecha_asignado=this.dataestatusfiat.fecha_asignado
          //this.item.fecha_asignado=this.dataestatusfiat.fecha_asignado
          //this.item.fecha_procesado=this.dataestatusfiat.fecha_procesado
          //this.item.fecha_completado=this.dataestatusfiat.fecha_completado
          //this.item.fecha_anulado=this.dataestatusfiat.fecha_anulado
          console.log('lola',this.dataestatusfiat )

        }).catch(err => {
          console.log(err)
        })
    },

    actualizarEstatus(item){  
       var today = new Date();

      // get the date and time
      var now = today.toLocaleString();

       var datestr = (new Date()).toUTCString();

        if (item.estatus == '1') {
         this.habilitar.boton2=false
         this.habilitar.opcion2=true
         this.habilitar.boton3=true
         this.habilitar.opcion3=true
         this.habilitar.boton4=true
         this.habilitar.opcion4=true
         this.habilitar.boton5=false
         this.habilitar.opcion5=true
         
      }
      if (item.estatus == '2') {
         this.habilitar.boton2=true
         this.habilitar.opcion2=true
         this.habilitar.boton3=false
         this.habilitar.opcion3=true
         this.habilitar.boton4=true
         this.habilitar.opcion4=true
         this.habilitar.boton5=false
         this.habilitar.opcion5=true
      }
      if (item.estatus == '3') {
         this.habilitar.boton2=true
         this.habilitar.opcion2=true
         this.habilitar.boton3=true
         this.habilitar.opcion3=true
         this.habilitar.boton4=false
         this.habilitar.opcion4=true
         this.habilitar.boton5=false
         this.habilitar.opcion5=true
      }
      if (item.estatus == '4') {
        this.habilitar.boton2=true
         this.habilitar.opcion2=true
         this.habilitar.boton3=true
         this.habilitar.opcion3=true
         this.habilitar.boton4=true
         this.habilitar.opcion4=true
         this.habilitar.boton5=true
         this.habilitar.opcion5=false
      }
      if (item.estatus == '5') {
         this.habilitar.boton2=true
         this.habilitar.opcion2=true
         this.habilitar.boton3=true
         this.habilitar.opcion3=true
         this.habilitar.boton4=true
         this.habilitar.opcion4=true
         this.habilitar.boton5=true
         this.habilitar.opcion5=true
      }
        this.axios.put('/put-fecha-fiat' , {'datos':item}).then((res) => {
        console.log(res.data)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se actualizo el estatus correctamente'

            this.axios.put( '/SendEmailEstatusFIAT', {'datos':item}).then((res)=>{
              console.log(res)
            }).catch((error) => {
              console.error(error)
            })

        this.fecthData()
        //this.EstatusFiat()
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
      this.registro = item

      if (this.registro.estatus == '1') {
         this.habilitar.boton2=false
         this.habilitar.opcion2=true
         this.habilitar.boton3=true
         this.habilitar.opcion3=true
         this.habilitar.boton4=true
         this.habilitar.opcion4=true
         this.habilitar.boton5=false
         this.habilitar.opcion5=true
      }
      if (this.registro.estatus == '2') {
         this.habilitar.boton2=true
         this.habilitar.opcion2=true
         this.habilitar.boton3=false
         this.habilitar.opcion3=true
         this.habilitar.boton5=false
         this.habilitar.opcion5=true
      }
      if (this.registro.estatus == '3') {
         this.habilitar.boton2=true
         this.habilitar.opcion2=true
         this.habilitar.boton3=true
         this.habilitar.opcion3=true
         this.habilitar.boton4=false
         this.habilitar.opcion4=true
         this.habilitar.boton5=false
         this.habilitar.opcion5=true
      }
      if (this.registro.estatus == '4') {
         this.habilitar.boton2=true
         this.habilitar.opcion2=true
         this.habilitar.boton3=true
         this.habilitar.opcion3=true
         this.habilitar.boton4=true
         this.habilitar.opcion4=true
         this.habilitar.boton5=true
         this.habilitar.opcion5=false
      }
      if (this.registro.estatus == '5') {
         this.habilitar.boton2=true
         this.habilitar.opcion2=true
         this.habilitar.boton3=true
         this.habilitar.opcion3=true
         this.habilitar.boton4=true
         this.habilitar.opcion4=true
         this.habilitar.boton5=true
         this.habilitar.opcion5=true
      }
    },
    date () {
        this.data = []
        console.log('lola2',this.from_date,this.to_date)
        this.datat.forEach(element => {
          console.log('lola3',element.fecha_creado,this.from_date,element.fecha_creado,this.to_date)
          if (element.fecha_creado>=this.from_date && element.fecha_creado <= this.to_date) {
            this.data.push(element)
          }
        })
      },
     exportaFiat() {
      this.dialogWait = true
      const data = {
        fecha_inicio: this.from_date,
        fecha_fin: this.to_date,
      }
      this.axios.get('generar_historico_fiat/'+this.from_date+'/'+this.to_date+'', {responseType: 'blob'}).then((res) => {
        this.download(res);
        this.dialogWait = false
        //this.snackbar = true
        //this.color = 'primary'
        //this.text = 'Se guardo correctamente'
      }).catch((err) => {
        console.log(err)
        this.dialogWait = false
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error ' + err
      });
    },   

    download(data) {
      if(!data){
          return
      }
      var blob = new Blob([data.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
      //var blob = new Blob([data.data], {type:'application/ms-excel'})
      
      var url = window.URL.createObjectURL(blob);
      var aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = url;
      //aLink.setAttribute("Data Template "," Data Template.xls ");
      document.body.appendChild(aLink)
      aLink.click()
    },

  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
