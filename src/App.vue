<template>
  <component :is="resolveLayout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useRouter } from '@/utils'
import LayoutBlank from '@/layouts/Blank.vue'
import LayoutContent from '@/layouts/Content.vue'

export default {
  name: "AppMainPage",
  components: {
    LayoutBlank,
    LayoutContent,
  },
  setup() {
    const { route } = useRouter()

    const resolveLayout = computed(() => {
      if (route.value.name === null) return null
      if (route.value.meta.layout === 'blank') return 'layout-blank'
      return 'layout-content'
    })

    return {
      resolveLayout,
    }
  },
  mounted() {
    if (localStorage.auth_token !== undefined) {
      this.axios.defaults.headers.common.Authorization = 'token ' + localStorage.auth_token
    } else { this.$router.push('/login')
    }
    
  },
}
</script>
