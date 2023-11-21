<template>
<div>
  <v-card id="account-setting-card">
    <v-card-title>
        Tasas
      

    </v-card-title>
    <v-row class="ma-0 pb-5 px-2">
      <v-col class="col-4 ">
        <v-select v-model="search" :items="dataPais" item-text="nombre" item-value="id" label="Pais" @change= 'tasaData()' outlined dense />
      </v-col>
    </v-row>

    <v-row class="ma-0 pb-5 px-2">
      <v-col cols="12">

        <v-data-table
          :headers="headers"
          :items="dataTasa"
          :items-per-page="10"
          class="elevation-1"
        >
          <template #[`item.tasa`]="{ item }">
            <v-row>
              <v-col class="col-10">
                <v-text-field
                  v-model="item.tasa"
                  type="number"
                  dense
                  :append-outer-icon="item.iconSend"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          <template #[`item.comision`]="{ item }">
            <v-row>
              <v-col class="col-10">
                <v-text-field
                  v-model="item.comision"
                  type="number"
                  dense
                  :append-outer-icon="item.iconSend"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          <template #[`item.monto`]="{ item }">
            <v-row>
              <v-col class="col-10">
                <v-text-field
                  v-model="item.monto"
                  type="number"
                  dense
                  :append-outer-icon="item.iconSend"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          <template #[`item.montomin`]="{ item }">
            <v-row>
              <v-col class="col-10">
                <v-text-field
                  v-model="item.montomin"
                  type="number"
                  dense
                  :append-outer-icon="item.iconSend"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>          
          <template #[`item.tasaaltomonto`]="{ item }">
            <v-row>
              <v-col class="col-10">
                <v-text-field
                  v-model="item.tasaaltomonto"
                  type="number"
                  dense
                  :append-outer-icon="item.iconSend"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>

          <template #[`item.tasav`]="{ item }">
            <v-row>
              <v-col class="col-10">
                <v-text-field
                  v-model="item.tasav"
                  type="number"
                  dense
                  :append-outer-icon="item.iconSend"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          <template #[`item.comisionv`]="{ item }">
            <v-row>
              <v-col class="col-10">
                <v-text-field
                  v-model="item.comisionv"
                  type="number"
                  dense
                  :append-outer-icon="item.iconSend"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          <template #[`item.montov`]="{ item }">
            <v-row>
              <v-col class="col-10">
                <v-text-field
                  v-model="item.montov"
                  type="number"
                  dense
                  :append-outer-icon="item.iconSend"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          <template #[`item.montominv`]="{ item }">
            <v-row>
              <v-col class="col-10">
                <v-text-field
                  v-model="item.montominv"
                  type="number"
                  dense
                  :append-outer-icon="item.iconSend"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>          
          <template #[`item.tasaaltomontov`]="{ item }">
            <v-row>
              <v-col class="col-10">
                <v-text-field
                  v-model="item.tasaaltomontov"
                  type="number"
                  dense
                  :append-outer-icon="item.iconSend"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>

          <template #[`item.acciones`]="{ item }">
            <v-icon
              color="success"
              dark
              title="Guardar"
              @click="saveCommission(item)"
            >
              {{ iconSave }}
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-card>
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
</div>
</template>

<script>
import { mdiPercentOutline, mdiContentSaveOutline, mdiCurrencyUsd  } from '@mdi/js'

export default {
  data() {
    return {
      search: null,
      query:'',
      headers: [
        //{ text: 'Id Pais', value: 'pais_id', width: '5%' },
        //{ text: 'País', value: 'pais_nombre', width: '15%' },
        //{ text: 'Moneda', value: 'pais_coin', width: '10%' },
        //{ text: 'Id Banco', value: 'id', width: '5%' },
        { text: 'Banco', value: 'nombre', width: '10%' },
        { text: 'Comisión Compra', value: 'comision', width: '5%' },
        { text: 'Tasa Base Compra', value: 'tasa', width: '10%' },
        { text: 'Monto Mínimo Compra', value: 'montomin', width: '5%' },
        { text: 'Monto Límite Compra', value: 'monto', width: '10%' },
        { text: 'Tasa Monto Alto Compra', value: 'tasaaltomonto', width: '10%' },
        { text: 'Comisión Venta', value: 'comisionv', width: '5%' },
        { text: 'Tasa Base Venta', value: 'tasav', width: '10%' },
        { text: 'Monto Mínimo Venta', value: 'montominv', width: '5%' },
        { text: 'Monto Límite Venta', value: 'montov', width: '10%' },
        { text: 'Tasa Monto Alto Venta', value: 'tasaaltomontov', width: '10%' },        
        { text: 'Acciones', value: 'acciones', width: '10%', align: 'center', },
      ],
      headersPais: [
        { text: 'Id País', value: 'pais_id', width: '15%' },
        { text: 'País', value: 'pais_nombre', width: '20%' },
      ],      
      dataTasa: [],
      dataPais: [],
      dialogWait: false,
      iconPercent: mdiPercentOutline,
      iconSave: mdiContentSaveOutline,
      iconDollar: mdiCurrencyUsd,
      snackbar: false,
      text: '',
      query:'',
    }
  },
  mounted() {
    this.PaisData()
  },
  methods: {
    tasaData() {
      
      this.query = '/get-paisbancotasa'
      
      if (this.search !== null){
        this.dialogWait = true
        this.query='/get-paisbancotasa/'+this.search+''
      
      this.axios.get(this.query).then(response => {
        this.dataTasa = response.data
          this.dialogWait = false
        console.log(response.data)
      }).catch(err => {
        console.log(err)
      })
     }
    },
    PaisData() {
      this.dialogWait = true
      this.axios.get('/paises/').then(response => {
          this.dataPais = response.data
          this.dialogWait = false
        }).catch(err => {
          console.log(err)
        })
    },
    saveCommission (item) {
      console.log(item)
      this.axios.patch('/paisbanco/' + item.id + '/', {
        monto: item.monto,
        montomin: item.montomin,
        comision: item.comision,
        tasa: item.tasa,
        tasaaltomonto: item.tasaaltomonto,
        montov: item.montov,
        montominv: item.montominv,
        comisionv: item.comisionv,
        tasav: item.tasav,
        tasaaltomontov: item.tasaaltomontov
      }).then(res => {
        console.log(res)
        this.snackbar = true
        this.text = 'Se guardo exitosamente'
        this.dataTasa = []
        this.tasaData()
      }).catch(err => {
        this.snackbar = true
        this.text = 'Ocurrio un error' + err
        console.log(err)
      })
    },
  },
}
</script>
