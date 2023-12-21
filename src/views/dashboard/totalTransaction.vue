<template>
  <v-card>
    <v-card-title class="align-start">
      <span class="font-weight-semibold">Total Transaction</span>
      <v-spacer/>
    </v-card-title>

    <v-divider class="my-2"></v-divider>

    <v-card-text>
      <v-row>
        <v-col
          v-for="data in statisticsData"
          :key="data.title"
          class="d-flex align-center"
        >
          <v-avatar
            size="44"
            :color="resolveStatisticsIconVariation (data.title).color"
            rounded
            class="elevation-1"
          >
            <v-icon
              dark
              color="white"
              size="30"
            >
              {{ resolveStatisticsIconVariation (data.title).icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <p class="text-xs mb-0">
              {{ data.title }}
            </p>
            <h3 class="text-xl font-weight-semibold">
              {{ data.total }}
            </h3>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiCurrencyUsd, mdiTrendingUp, mdiDotsVertical, mdiLabelOutline, mdiCurrencyBtc, mdiEthereum } from '@mdi/js'

export default {
  name: "TotalTransactions",
  setup() {
    const statisticsData = [
      {
        title: 'Received',
        total: '245k',
      },
      {
        title: 'Sent',
        total: '12.5k',
      },
      {
        title: 'Swap',
        total: '1.54k',
      },
      {
        title: 'Dex',
        total: '$88k',
      },
      {
        title: 'Fiat',
        total: '$88k',
      },
    ]

    const resolveStatisticsIconVariation = data => {
      if (data === 'Received') return { icon: mdiCurrencyBtc, color: 'primary' }
      if (data === 'Sent') return { icon: mdiEthereum, color: 'success' }
      if (data === 'Swap') return { icon: mdiCurrencyUsd, color: 'warning' }
      if (data === 'Dex') return { icon: mdiCurrencyUsd, color: 'info' }
      if (data === 'Fiat') return { icon: mdiCurrencyUsd, color: 'info' }

      return { icon: mdiAccountOutline, color: 'success' }
    }

    return {
      statisticsData,
      resolveStatisticsIconVariation,

      // icons
      icons: {
        mdiDotsVertical,
        mdiTrendingUp,
        mdiAccountOutline,
        mdiLabelOutline,
        mdiCurrencyUsd,
        mdiCurrencyBtc,
        mdiEthereum,
      },
    }
  },
}
</script>
