<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-card>
        <v-card-title class="align-start">
          <span class="font-weight-semibold">Balance total por moneda</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider class="my-2"></v-divider>
        <v-card-text>
          <v-row>
            <v-col
              v-for="item in dataBalance"
              :key="item.title"
              class="d-flex align-center col-12 col-sm-6 col-md-4"
            >
              <v-avatar
                size="44"
                rounded
              >
                <v-img class="elevation-1" :src="item.img" />
              </v-avatar>
              <div class="ms-3">
                <p class="text-xs mb-0">
                  {{ item.title }}
                </p>
                <h3 class="text-xl font-weight-semibold">
                  {{ item.total }}
                </h3>
                <p class="text-xs mb-0">
                  ({{ item.usdPrice }} USD)
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <h3 class="font-weight-semibold">Balance total</h3>
              </v-col>
              <v-col class="text-right">
                <h3 class="font-weight-semibold">
                  {{ totalDollar }} USD
                </h3>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="text-right">
                <span class="font-weight-semibold">Prices powered by</span> <a href="https://www.coingecko.com/en/api" target="_blank" color="primary">CoinGecko</a>
              </v-col>
            </v-row>
          </v-container>          
        </v-card-text>
      </v-card>
    </v-col>

    <v-col
      cols="12"
    >
      <!-- <total-transaction></total-transaction> -->
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
import axios from 'axios'
// eslint-disable-next-line object-curly-newline
import { mdiAccountOutline, mdiCurrencyUsd, mdiTrendingUp, mdiDotsVertical, mdiLabelOutline, mdiCurrencyBtc, mdiEthereum } from '@mdi/js'
// import StatisticsCardVertical from '@/components/statistics-card/StatisticsCardVertical.vue'

import TotalTransaction from './totalTransaction.vue'
const BINANCE_NEAR = 'https://api.binance.com/api/v3/ticker/24hr?symbol=NEARUSDT'

export default {
  components: {
    TotalTransaction,
  },
  data() {
    return {
      dataBalance: [],
      dialogWait: false,
      coinGecko: [],
      totalDollar: 0,
    }
  },
  mounted() {
    this.dataCoinGecko()
    this.balance()
  },
  methods: {
    async dataCoinGecko () {
      this.dialogWait = true
      this.coinGecko = []
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res => {
        console.log(res.data)
        this.coinGecko = res.data
      })
    },
    balance() {
      const noTruncarDecimales = {maximumFractionDigits: 4};
      this.dialogWait = true
      var image = ''
      var currentPriceUsd = 0
      this.axios.get('/get-balance-defix').then(response => {
        response.data.forEach(element => {
          this.coinGecko.forEach(item => {
            currentPriceUsd = 0
            if (element.coin.toLowerCase() === item.symbol) {
              currentPriceUsd = parseFloat(item.current_price)*parseFloat(element.balance)
              this.totalDollar = parseFloat(this.totalDollar)+parseFloat(currentPriceUsd)
              this.dataBalance.push({
                title: element.coin,
                total: element.balance.toFixed(4),
                usdPrice: currentPriceUsd.toLocaleString('en-US', noTruncarDecimales),
                img: require('@/assets/images/defix/coins/' + element.coin + '.png')
              })
            }
          });
        })
        this.totalDollar = this.totalDollar.toLocaleString('en-US', noTruncarDecimales);
        this.dialogWait = false
      }).catch(err => {
        console.log(err)
      })
    },
  },
}
</script>
