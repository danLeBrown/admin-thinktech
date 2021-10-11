<template>
  <div>
    <div class="alert-div">
      <v-alert
        v-for="error in errors"
        :key="error.id"
        transition="scale-transition"
        type="error"
        border="left"
        dismissible
        elevation="5"
      >
        <span class="alert-text">{{ error }}</span>
      </v-alert>
      <v-alert
        v-for="message in success"
        :key="message.id"
        transition="scale-transition"
        type="success"
        border="left"
        dismissible
        elevation="5"
      >
        <span class="alert-text">{{ message }}</span>
      </v-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertComponent',
  data() {
    return {}
  },
  computed: {
    errors() {
      return this.$store.state.alert.errors
    },
    success() {
      return this.$store.state.alert.success
    },
  },
  watch: {},
}
</script>

<style scoped>
.alert-div {
  position: fixed;
  z-index: 11;
  bottom: 0;
  right: 1rem;
  background: none;
  width: 90%;
  max-width: 380px;
}
.alert-text {
  font: inherit;
  font-family: 'Montserrat', sans-serif;
  word-break: break-word;
}
</style>
