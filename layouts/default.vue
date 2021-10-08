<template>
  <div>
    <v-app id="app-wrapper">
      <v-main>
        <v-container
          class="app-container"
          :class="
            ['create-account'].includes($route.name) ? 'hide-nav' : 'show-nav'
          "
        >
          <NavbarComponent
            v-if="!['create-account'].includes($route.name)"
            id="nav-component"
          />
          <div></div>
          <RouterView id="router-view" />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import NavbarComponent from '~/components/includes/NavbarComponent'
export default {
  name: 'Default',
  components: {
    NavbarComponent,
  },
}
</script>

<style scoped>
.app-container {
  display: grid;
  width: 100%;
  grid-gap: 1rem;
}

.show-nav {
  grid-template-columns: 20% 80%;
}
#nav-component {
  flex: 2;
  height: 100vh;
  position: fixed;
  top: 0;
  width: 19%;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
}
#router-view {
  flex: 10;
  padding: 1rem;
}
</style>
