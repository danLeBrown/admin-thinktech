<template>
  <div>
    <div class="aside-container">
      <div style="height: 100%">
        <!-- :style="`background: ${$vuetify.theme.themes.light.aside}`" -->
        <aside class="mobile-nav">
          <nuxt-link
            :to="{ name: 'index' }"
            class="navbar-title"
            style="height: 100%; width: 100%"
          >
            <img
              :src="require('~/assets/images/logo.png')"
              class="app-title sm-app-title"
            />
          </nuxt-link>

          <div class="aside-nav-content nav-container">
            <div class="navbar-links nav">
              <nuxt-link to="/dashboard"
                ><i class="fas fa-chart-bar"></i> Dashboard</nuxt-link
              >
              <nuxt-link to="/articles"
                ><i class="fas fa-newspaper"></i> Articles</nuxt-link
              >
              <nuxt-link to="/dashboard"
                ><i class="fas fa-list"></i> Categories</nuxt-link
              >
              <nuxt-link to="/dashboard"
                ><i class="fas fa-cogs"></i> Settings</nuxt-link
              >
            </div>
            <button v-if="!dark" v-ripple @click="darkThemeSwitch">
              <i class="fas fa-moon"></i>
            </button>
            <button v-else v-ripple @click="darkThemeSwitch">
              <i class="fas fa-sun"></i>
            </button>
          </div>
        </aside>
      </div>
    </div>
    <v-scale-transition>
      <div v-show="showSearchBar">
        <div
          class="search-container vs-wrapper"
          :style="
            !dark
              ? `background: ${$vuetify.theme.themes.dark.text}`
              : `background: ${$vuetify.theme.themes.light.text}`
          "
        >
          <div class="search-container-content">
            <div class="close-search-div">
              <button v-ripple type="button" @click="closeSearch">
                &times;
              </button>
            </div>
            <br />
            <br />
            <form>
              <input
                type="text"
                placeholder="Type to search"
                background-color="text"
                class="featured"
                :style="
                  !dark
                    ? `color: ${$vuetify.theme.themes.light.text}`
                    : `color: ${$vuetify.theme.themes.dark.text}`
                "
              />
              <button v-ripple>
                <i class="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </v-scale-transition>
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
.close-search-div {
  position: absolute;
  right: 0;
}
.close-search-div button {
  margin-right: 2rem;
  font-size: 2rem;
  border: none;
}
.search-container-content {
  position: relative;
}
.search-container {
  padding-top: 5%;
  transition: all ease-in-out 300ms;
}
.search-container form {
  display: flex;
  width: 100%;
  padding: 2rem;
}
.search-container input {
  border: none;
  width: 100%;
  padding: 1rem;
  font: inherit;
  flex: 11;
  border-radius: 0.25rem 0 0 0.25rem;
}

.search-container button {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
}
.header {
  padding: 25px 0 0;
}
.nav-container {
  position: relative;
}

.nav-container a {
  width: 100%;
}

.app-title {
  width: inherit;
  height: auto;
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.sm-app-title {
  margin: 0 auto;
  right: 0;
}
.lg-app-title {
  left: -5%;
  top: -226%;
}
.nav-container button {
  background: none;
  border: none;
  padding: 0.5rem;
}

.sm-nav-container button:nth-child(1) {
  justify-self: flex-start;
}

.sm-nav-container button:last-child {
  justify-self: flex-end;
}

.toggle-btn span {
  display: block;
  content: '';
  width: 25px;
  height: 2px;
  margin-bottom: 3px;
}

.lg-nav-div {
  display: none;
}

.sm-nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.aside-container {
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  height: inherit;
}
aside {
  height: 100%;
}
.aside-nav-content {
  display: grid;
}
.navbar-links {
  margin-top: 150px;
  border-top: 1px solid #e2e5e6;
  font-weight: 600;
}
.aside-nav-content a,
.aside-nav-content button {
  padding: 1rem;
  padding-left: 2rem;
  display: block;
  font: inherit;
  text-decoration: none;
  color: #acb8be;
  border-bottom: 3px solid #e2e5e6;
}
.navbar-links i {
  font-size: 1.4rem;
  margin-right: 1rem;
}
.aside-nav-content a:hover {
  color: #0864b7;
  border-bottom: 3px solid #0864b7;
}
.close-mobile-nav {
  display: flex;
  justify-content: flex-end;
}
.close-mobile-nav button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 50px;
  height: 50px;
  margin-right: 2rem;
  font-size: 2rem;
  border: none;
  background: none;
}
@media screen and (min-width: 1024px) {
  .sm-nav-container {
    display: none;
  }
  .lg-nav-div {
    display: block;
  }
  .lg-nav-container {
    display: flex;
    width: 100%;
    font-size: 14px;
    align-items: center;
    justify-content: flex-end;
  }
  .lg-nav-container .navbar-links {
    display: flex;
    justify-content: center;
    flex: 7;
  }
  .lg-nav-container .navbar-tools {
    color: inherit;
    display: flex;
    justify-content: flex-end;
    flex: 4;
  }
  .lg-nav-container .navbar-tools a,
  .lg-nav-container .navbar-links a {
    margin: 0.5rem;
    padding: 0 0.5rem;
  }
}
</style>
