<template>
  <div>
    <div class="aside-container">
      <aside class="mobile-nav">
        <nuxt-link
          :to="{ name: 'index' }"
          class="navbar-title"
          style="height: 100%; width: 100%"
        >
          <!-- <img
            :src="require('~/assets/images/logo.png')"
            class="app-title sm-app-title"
          /> -->
        </nuxt-link>

        <div class="aside-nav-content nav-container">
          <div class="navbar-links nav">
            <nuxt-link to="/dashboard"
              ><i class="bi bi-bar-chart"></i> Dashboard</nuxt-link
            >
            <nuxt-link to="/articles"
              ><i class="bi bi-newspaper"></i> Articles</nuxt-link
            >
            <nuxt-link to="/categories"
              ><i class="bi bi-card-list"></i> Categories</nuxt-link
            >
            <nuxt-link to="/edit-profile"
              ><i class="bi bi-person"></i> Profile</nuxt-link
            >
          </div>
          <button v-if="!dark" v-ripple @click="darkThemeSwitch">
            <i class="bi bi-moon"></i>
          </button>
          <button v-else v-ripple @click="darkThemeSwitch">
            <i class="bi bi-sun"></i>
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {
      showAsideNav: false,
      showSearchBar: false,
    }
  },
  computed: {
    dark() {
      return this.$store.state.theme.dark
    },
  },
  mounted() {
    this.checkDarkMode()
  },
  methods: {
    checkDarkMode() {
      const darkMode = localStorage.getItem('dark_mode')
      if (![null, undefined, ''].includes(darkMode)) {
        return darkMode
      }
      return false
    },
    darkThemeSwitch() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('dark_mode', this.$vuetify.theme.dark)
      this.$store.commit('theme/setDarkMode', this.$vuetify.theme.dark)
    },
    ctcMobileNav(e) {
      if ($(e.target).closest('aside').length === 0) {
        this.closeMobileNav()
      }
    },
    closeMobileNav() {
      this.showAsideNav = false
    },
    showMobileNav() {
      this.showAsideNav = true
    },
    closeSearch() {
      this.showSearchBar = false
    },
    showSearch() {
      this.showSearchBar = true
    },
  },
}
</script>

<style scoped>
.aside-container {
  /* position: fixed; */
  display: flex;
  height: 100%;
  /* position: absolute;
  top: 0;
  bottom: 0; */
}
.aside-nav-content {
  display: grid;
}
.navbar-links {
  margin-top: 150px;
  border-top: 1px solid var(--input-border-color);
  font-weight: 600;
}
.aside-nav-content a,
.aside-nav-content button {
  white-space: nowrap;
  padding: 1rem;
  padding-left: 2rem;
  display: block;
  font: inherit;
  text-decoration: none;
  color: #acb8be;
  border-bottom: 3px solid var(--input-border-color);
}
.navbar-links i {
  font-size: 1.4rem;
  margin-right: 1rem;
}
</style>
