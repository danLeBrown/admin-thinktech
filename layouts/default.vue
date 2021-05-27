<template>
  <div>
    <v-app id="app-wrapper">
      <v-main>
        <v-container id="app-container">
          <NavbarComponent id="nav-component" />
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
#app-container {
  display: flex;
  width: 100%;
}
#nav-component {
  flex: 2;
  height: 100vh;
  position: sticky;
  top: 0px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
}
#router-view {
  flex: 10;
  padding: 1rem;
}
</style>
