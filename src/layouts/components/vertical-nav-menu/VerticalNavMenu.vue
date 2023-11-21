<template>
<div>
  <v-navigation-drawer
    :value="isDrawerOpen"
    app
    floating
    width="260"
    class="app-navigation-menu"
    :right="$vuetify.rtl"
    @input="val => $emit('update:is-drawer-open', val)"
  >
    <!-- Navigation Header -->
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link
        to="/"
        class="d-flex align-center text-decoration-none"
      >
        <v-img
          :src="require('@/assets/images/defix/logo.png')"
          max-height="40px"
          max-width="40px"
          alt="logo"
          contain
          eager
          class="app-logo me-3"
        ></v-img>
        <v-slide-x-transition>
          <h2 class="app-title text--primary">
            deFix3
          </h2>
        </v-slide-x-transition>
      </router-link>
    </div>
    <nav-menu-section-title title=""></nav-menu-section-title>
    <!-- Navigation Items -->
    <v-list
      expand
      shaped
      class="vertical-nav-menu-items pr-5"
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        class="vertical-nav-menu-link"
        v-bind="$attrs"
        active-class="bg-gradient-primary white--text"
        v-show="item.leer"
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon
            :class="{'alternate-icon-small': !icon}"
            class="mx-auto"
          >
            {{ item.icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ item.text }}
        </v-list-item-title>
      </v-list-item>
      <nav-menu-section-title title=""></nav-menu-section-title>
    </v-list>
  </v-navigation-drawer>
</div>
</template>

<script>
import {
  mdiHomeOutline,
  mdiAlphaTBoxOutline,
  mdiEyeOutline,
  mdiCreditCardOutline,
  mdiTable,
  mdiFileOutline,
  mdiFormSelect,
  mdiAccountCogOutline,
  mdiAccountDetailsOutline,
} from '@mdi/js'
// import NavMenuSectionTitle from './components/NavMenuSectionTitle.vue'

export default {
  components: {
    // NavMenuSectionTitle,
  },
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      permisos: JSON.parse(localStorage.permisos),
      icons: {
        mdiHomeOutline,
        mdiAlphaTBoxOutline,
        mdiEyeOutline,
        mdiCreditCardOutline,
        mdiTable,
        mdiFileOutline,
        mdiFormSelect,
        mdiAccountCogOutline,
        mdiAccountDetailsOutline,
      },
      selectedItem: 1,
      items: [],
    }
  },
  mounted() {
    this.permissions()
    // console.log(this.permisos)
  },
  methods: {
    permissions () {
      this.permisos.forEach(element => {
        if (element.modulo === 'Balance') {
          element.text = 'Balance'
          element.icon = mdiHomeOutline
          element.to = '/dashboard'
        } else if (element.modulo === 'UsuariosDefix') {
          element.text = 'Usuarios deFix3'
          element.icon = mdiAccountDetailsOutline
          element.to = '/pages/users-defix'
        } else if (element.modulo === 'Transacciones') {
          element.text = 'Transacciones'
          element.icon = mdiAlphaTBoxOutline
          element.to = '/trans-history'
        } else if (element.modulo === 'UsersAdmin') {
          element.text = 'Usuarios del sistema'
          element.icon = mdiAlphaTBoxOutline
          element.to = '/pages/register'
        }
          else if (element.modulo === 'Comisiones')  {
          element.text = 'Comisiones'
          element.icon = mdiAlphaTBoxOutline
          element.to = '/pages/commissions'
        }
          else if (element.modulo === 'Paises')  {
          element.text = 'Países'
          element.icon = mdiAlphaTBoxOutline
          element.to = '/pages/countries'
        }
          else if (element.modulo === 'KYC')  {
          element.text = 'KYC'
          element.icon = mdiAlphaTBoxOutline
          element.to = '/pages/kyc'
        }
        else if (element.modulo === 'fiat')  {
          element.text = 'FIAT'
          element.icon = mdiAlphaTBoxOutline
          element.to = '/pages/fiat'
        }
        else if (element.modulo === 'tasa')  {
          element.text = 'TASA'
          element.icon = mdiAlphaTBoxOutline
          element.to = '/pages/tasa'
        }
        this.items.push(element)
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

.app-logo {
  transition: all 0.18s ease-in-out;
  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

@include theme(app-navigation-menu) using ($material) {
  background-color: map-deep-get($material, 'background');
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}
// .app-navigation-menu {
//   .upgrade-banner {
//     position: absolute;
//     bottom: 13px;
//     left: 50%;
//     transform: translateX(-50%);
//   }
// }
.alternate-icon-small {
  font-size: 14px;
  height: 14px;
  width: 14px;
}

.vertical-nav-menu-link {
  &.v-list-item--active {
    box-shadow: 0 5px 10px -4px rgba(94, 86, 105, 0.42);
    @include elevationTransition();
  }
}
</style>
