<template>
<div>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-tabs
      v-model="tab"
      show-arrows
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.icon"
      >
        <v-icon
          size="20"
          class="me-3"
        >
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card>
          <v-card-title>
            <v-row>
              <v-col class="col-12 col-sm-4 mt-3">
                <v-text-field
                  v-model="search"
                  rounded
                  dense
                  outlined
                  :prepend-inner-icon="icons.mdiMagnify"
                  class="app-bar-search flex-grow-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>
          
          <v-row class="ma-0 pb-5 px-2">
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="dataUser"
                :items-per-page="10"
                :search="search"
                class="elevation-1"
              ></v-data-table>
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
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
</div>
</template>

<script>
import { mdiAccountOutline, mdiLockOpenOutline, mdiInformationOutline } from '@mdi/js'

export default {
  data() {
    return {
      search: '',
      tab:null,
      tabs: [
        { title: 'Lista de usuarios defix', icon: mdiAccountOutline },
      ],
      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
      },
      headers: [
        { text: 'Usuarios', value: 'users' },
      ],
      dataUser: [],
      dialogWait: false
    }
  },
  mounted() {
    this.userData()
  },
  methods: {
    userData() {
      this.dialogWait = true
      // this.axios.defaults.headers.common.Authorization = localStorage.Authorization
      this.axios.get('/get-users-defix').then(response => {
        console.log(response.data)
        response.data.forEach(element => {
          this.dataUser.push({ users: element.defix_id })
          this.dialogWait = false
        })
      }).catch(err => {
        console.log(err)
      })
    },
  },
}
</script>
