<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="require('@/assets/images/defix/logo.png')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              deFix3
            </h2>
          </router-link>
        </v-card-title>

        <!-- login form -->
        <v-card-text>
          <v-form @submit="login()">
            <v-text-field
              v-model="username"
              outlined
              label="Email or Username"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="hide_password ? 'password' : 'text'"
              label="Password"
              placeholder="**********"
              :append-icon="hide_password ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="hide_password = !hide_password"
              @
            ></v-text-field>

            <v-btn
              block
              color="primary"
              class="mt-6"
              type="submit"
            >
              Iniciar sesion
            </v-btn>
          </v-form>
        </v-card-text>

      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'

export default {
  setup() {
    return {
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  data() {
    return {
      hide_password: true, 
      username: '',
      password: '',
    }
  },
  mounted() {
    
  },
  methods: {
    login() {
      this.axios.post('/login/', { username: this.username, password: this.password }).then((res) => {
        localStorage.dataUser = JSON.stringify(res.data)
        localStorage.Authorization = res.data.token
        localStorage.permisos = JSON.stringify(res.data.permisos)
        this.axios.defaults.headers.common.Authorization = 'token ' + res.data.token
        this.$router.push({name: 'dashboard'})
      }).catch((err) => {
        console.log(err)
      });
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
