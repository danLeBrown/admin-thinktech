<template>
  <div>
    <v-app id="app-wrapper">
      <v-main>
        <v-container
          id="app-container"
          :class="
            ['create-account', 'login'].includes($route.name)
              ? 'hide-nav'
              : 'show-nav'
          "
        >
          <NavbarComponent
            v-if="!['create-account', 'login'].includes($route.name)"
            class="nav-component"
          />
          <RouterView class="router-view" />
          <AlertComponent />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import NavbarComponent from '~/components/includes/NavbarComponent'
import AlertComponent from '~/components/includes/AlertComponent'
import User from '~/assets/js/api/User'
export default {
  name: 'Default',
  components: {
    NavbarComponent,
    AlertComponent,
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
  },
  mounted() {
    this.$root.$on('setupAuth', (res) => {
      localStorage.setItem('admin_thinktech_auth_token', res.data.data.token)
      this.$store.dispatch('success/getAlert', res)
      if (![undefined, null, ''].includes(this.$route.query.redirect)) {
        return (window.location = this.$route.query.redirect)
      }
      return (window.location = '/dashboard')
    })
  },
  async beforeMount() {
    await User.getCurrent()
      .then(async (res) => {
        await this.$store.dispatch('user/storeUser', res.data.data.user)
        if (this.user.role.role !== 'author') {
          return this.$router.push(`/login?redirect=dashboard`)
        }
        return this.$router.push('/dashboard')
      })
      .catch(() => {
        return this.$router.push(`/login?redirect=dashboard`)
      })
  },
}
</script>

<style scoped>
#app-container {
  display: flex;
  width: 100%;
}
.nav-component {
  display: none;
  position: relative;
}
.router-view {
  padding: 1rem;
}
@media screen and (min-width: 768px) {
  .nav-component {
    width: 100%;
    display: block;
    flex: 5;
    height: 100vh;
    top: 0;
    bottom: 0;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .router-view {
    flex: 6;
  }
}
</style>
