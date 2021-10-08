<template>
  <div>
    <div class="form-container">
      <div class="flex-container">
        <div style="justify-self: center">
          <h1>Become an author on ThinkTech!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio, ab
            excepturi maxime, laudantium eum minus rerum delectus reiciendis
            maiores velit qui. Tempora aut enim, provident quos ipsum optio iure
            corporis?
          </p>
        </div>
        <form action="">
          <div class="input-div">
            <label for="" class="active">Name</label>
            <input v-model="user.name" type="text" name="name" />
          </div>
          <div class="input-div">
            <label for="" class="active">Email</label>
            <input v-model="user.email" type="email" name="email" />
          </div>
          <div class="input-div">
            <label for="" class="active">Password</label>
            <input
              v-model="user.password"
              :type="!password.show ? 'password' : 'text'"
              name="password"
            />
            <button
              type="button"
              class="toggle-btn"
              @click="togglePasswordState"
            >
              <span v-if="!password.show"><i class="bi bi-eye"></i></span>
              <span v-else><i class="bi bi-eye-slash"></i></span>
            </button>
          </div>
          <button type="submit" class="btn">Become An Author</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import User from '~/assets/js/api/User'
export default {
  name: 'CreateAccount',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      },
      password: {
        show: false,
      },
    }
  },
  methods: {
    togglePasswordState() {
      return (this.password.show = !this.password.show)
    },
    async register() {
      this.loading = true
      await User.register(this.user)
      this.loading = false
    },
  },
}
</script>

<style scoped></style>
