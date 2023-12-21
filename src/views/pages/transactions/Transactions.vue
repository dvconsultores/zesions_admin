<template>
  <v-row>
    <v-col
      cols="12"
      class="mb-6"
    >
      <v-card>
        <v-card-title>Historial de transacciones</v-card-title>
        <v-row class="ma-0 pb-5 px-2">
          <v-col class="col-12 col-sm-4 mb-0">
            <v-text-field v-model="search" label="Buscar" rounded dense outlined />
          </v-col>
          <v-col class="col-12 col-sm-3 mb-0">
            <v-text-field type="date" v-model="from_date" label="Fecha desde" rounded dense outlined />
          </v-col>
          <v-col class="col-12 col-sm-3 mb-0">
            <v-text-field type="date" v-model="to_date" label="Fecha hasta" rounded dense outlined />
          </v-col>
          <v-col class="col-12 col-sm-2 mb-0">
              <v-btn class="mr-2" color="primary" @click="date()">Buscar</v-btn>
              <v-btn fab small color="primary" @click="$router.go()">
                <v-icon>
                  {{ orbit }}
                </v-icon>
              </v-btn>
            
          </v-col>
          
          <v-col class="col-12 mt-0">
            <v-data-table
              :headers="headers"
              :items="dataHistory"
              :items-per-page="10"
              :search="search"
              class="elevation-1"
            >
              <template v-slot:item.hash="{ item }">
                <a :href="item.hashUrl" target="_blank">
                  {{ item.hash }}
                </a>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
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
  </v-row>
</template>

<script>
  import { mdiOrbitVariant } from '@mdi/js'
  export default {
    name: "Transactions",
    data () {
      return {
        search: '',
        dialogWait: false,
        headers: [
          { text: 'Emisor', value: 'emisor', width: '10%' },
          { text: 'Receptor', value: 'receptor', width: '10%' },
          { text: 'Fecha', value: 'fecha', width: '20%' },
          { text: 'Moneda', value: 'moneda', width: '15%' },
          { text: 'Valor', value: 'valor', width: '10%' },
          { text: 'tipo', value: 'tipo', width: '15%' },
          { text: 'Hash', value: 'hash', width: '15%' },
        ],
        dataHistory: [],
        dataHistoryC: [],
        from_date: '',
        to_date: '',
        orbit: mdiOrbitVariant,
      }
    },
    mounted() {
      this.historyTrans()
    },
    methods: {
      historyTrans() {
        this.dialogWait = true
        this.axios.post('/get-transaction-history', {
          coin: "%%",
          date_year: "%%",
          date_month: "%%"
        }).then(response => {
          var urlHash = ''
          response.data.forEach(element => {
            if (process.env.NODE_ENV === 'development') {
              if (element.coin === 'BTC') {
                urlHash = 'https://live.blockcypher.com/btc-testnet/tx/'+ element.hash + '/'
              } else if (element.coin === 'NEAR') {
                urlHash = 'https://explorer.testnet.near.org/transactions/' + element.hash
              } else {
                urlHash = 'https://etherscan.io/tx/' + element.hash
              }
            } else {
              if (element.coin === 'BTC') {
                urlHash = 'https://live.blockcypher.com/btc/tx/'+ element.hash + '/'
              } else if (element.coin === 'NEAR') {
                urlHash = 'https://explorer.near.org/transactions/' + element.hash
              } else {
                urlHash = 'https://etherscan.io/tx/' + element.hash
              }
            }
            this.dataHistoryC.push({
              emisor: element.from_sezions,
              receptor: element.to_sezions,
              fecha: element.date_fech,
              moneda: element.coin,
              valor: parseFloat(element.value).toFixed(4),
              tipo: element.tipo,
              hash: element.hash.substring(0, 15) + '...',
              hashUrl: urlHash 
            })
          })
          this.dataHistory = this.dataHistoryC
          this.dialogWait = false
        }).catch(err => {
          console.log(err)
        })
      },
      date () {
        this.dataHistory = []
        this.dataHistoryC.forEach(element => {
          if (this.from_date <= element.fecha && element.fecha <= this.to_date) {
            this.dataHistory.push(element)
          }
        })
      },
    },
  }
</script>
