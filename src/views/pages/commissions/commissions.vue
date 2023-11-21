<template>
<div>
  <v-card id="account-setting-card">
    <v-card-title>
      Comisiones
    </v-card-title>
    <v-row class="ma-0 pb-5 px-2">
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="dataCommissions"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:item.transfer="{ item }">
            <v-row>
              <v-col class="col-10">
                <v-text-field
                  v-model="item.transfer"
                  type="number"
                  dense
                  :append-outer-icon="item.iconSend"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          <template v-slot:item.swap="{ item }">
            <v-row>
              <v-col class="col-10">
                <v-text-field
                  v-model="item.swap"
                  v-show="!item.disabled"
                  type="number"
                  dense
                  :append-outer-icon="iconPercent"
                ></v-text-field>
                <span v-show="item.disabled">No disponible</span>
              </v-col>
            </v-row>
          </template>
          <!-- <template v-slot:item.fiat="{ item }">
            <v-row>
              <v-col class="col-10">
                <v-text-field
                  v-model="item.fiat"
                  type="number"
                  dense
                  :append-outer-icon="iconPercent"
                ></v-text-field>
              </v-col>
            </v-row>
          </template> -->
          <template v-slot:item.acciones="{ item }">
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
      headers: [
        { text: 'Moneda', value: 'coin', width: '15%' },
        { text: 'Nombre', value: 'name', width: '20%' },
        { text: '% Envio', value: 'transfer', width: '15%' },
        { text: '% swap', value: 'swap', width: '15%' },
        // { text: '% Fiat', value: 'fiat', width: '15%' },
        { text: 'Acciones', value: 'acciones', width: '10%', align: 'center', },
      ],
      dataCommissions: [],
      dialogWait: false,
      iconPercent: mdiPercentOutline,
      iconSave: mdiContentSaveOutline,
      iconDollar: mdiCurrencyUsd,
      snackbar: false,
      text: '',
    }
  },
  mounted() {
    this.commissionsData()
  },
  methods: {
    commissionsData() {
      //this.dialogWait = true
      // this.axios.defaults.headers.common.Authorization = localStorage.Authorization
      this.axios.get('/comisiones/').then(response => {
        //this.dialogWait = false
        
        console.log(response.data)
        var icon = ''
        var disabled = false
        response.data.forEach(element => {
          disabled = false
          if (element.coin === 'NEAR') {
            icon = this.iconDollar
            disabled= true
          } else {
            icon = this.iconPercent
          }
          if (element.coin === 'BTC') {
            disabled = true
          }
          this.dataCommissions.push({
            coin: element.coin,
            name: element.nombre,
            transfer: element.transfer,
            swap: element.swap,
            fiat: element.fiat,
            iconSend: icon,
            disabled: disabled,
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    saveCommission (item) {
      console.log(item)
      this.axios.patch('/comisiones/' + item.coin + '/', {
        transfer: item.transfer,
        swap: item.swap,
        fiat: item.fiat
      }).then(res => {
        console.log(res)
        this.snackbar = true
        this.text = 'Se guardo exitosamente'
        this.dataCommissions = []
        this.commissionsData()
      }).catch(err => {
        this.snackbar = true
        this.text = 'Ocurrio un error' + err
        console.log(err)
      })
    },
  },
}
</script>
