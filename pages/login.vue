<template>
  <div>
    <div class="form-container">
      <div class="flex-container">
        <div style="justify-self: center">
          <h1>Resume writing great articles on ThinkTech!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio, ab
            excepturi maxime, laudantium eum minus rerum delectus reiciendis
            maiores velit qui. Tempora aut enim, provident quos ipsum optio iure
            corporis?
          </p>
        </div>
        <form method="post" @submit.prevent="login">
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
          <nuxt-link
            :to="
              ![undefined, null, ''].includes($route.query.redirect)
                ? '/create-account?redirect=' + $route.query.redirect
                : '/create-account'
            "
            >Don't have an account yet?</nuxt-link
          >
          <div class="input-div">
            <button
              type="submit"
              class="btn fill-btn"
              :class="loading ? 'loading-btn' : ''"
            >
              <span v-if="loading"
                ><v-progress-circular
                  indeterminate
                  color="white"
                  width="3"
                  size="20"
                ></v-progress-circular
              ></span>
              <span v-else> Become An Author </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import User from '~/assets/js/api/User'
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      user: {
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
    async login() {
      this.loading = true
      await User.login(this.user)
        .then(async (res) => {
          await localStorage.setItem(
            'admin_thinktech_auth_token',
            res.data.data.token
          )
          this.$store.dispatch('success/getAlert', res)
          await this.$store.dispatch('user/getUser')
          if (![undefined, null, ''].includes(this.$route.query.redirect)) {
            return this.$router.push(this.$route.query.redirect)
          } else {
            return this.$router.push('/dashboard')
          }
        })
        .catch((err) => {
          return this.$store.dispatch('alert/getAlert', err.response)
        })
      this.loading = false
    },
  },
}
</script>

<style scoped></style>
