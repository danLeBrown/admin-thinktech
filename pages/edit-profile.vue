<template>
  <div>
    <h2><i class="bi bi-person"></i> Profile</h2>
    <br />
    <div class="form-container">
      <div class="flex-container">
        <div style="justify-self: center">
          <div class="img-div">
            <img
              id="profile-display"
              :src="require('~/assets/images/about.jpeg')"
              :alt="user.name"
              loading="lazy"
            />
            <button>
              <i class="bi bi-camera-fill" @click="triggerclick"></i>
            </button>
          </div>
          <div>
            <br />
            <h4><i class="bi bi-calendar-event"></i> Created on:</h4>
          </div>
        </div>
        <form
          enctype="multipart/form-data"
          @submit.prevent="editProfile($event)"
        >
          <input
            id="profile-image"
            style="display: none"
            type="file"
            name="image"
            accept=".jpeg, .jpg, .png"
            @change="displayImage($event)"
          />
          <div class="input-div">
            <label for="" class="active">Name</label>
            <input v-model="user.name" type="text" name="name" />
          </div>
          <!-- <div class="input-div">
            <label for="">Email</label>
            <input v-model="user.email" type="email" disabled />
          </div> -->
          <div class="input-div">
            <label for="" class="active">Bio</label>
            <textarea
              id=""
              v-model="user.bio"
              name="bio"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <button
            class="fill-btn"
            :class="loading ? 'loading-btn' : ''"
            type="submit"
            name="login-btn"
          >
            <span v-if="loading"
              ><v-progress-circular
                indeterminate
                color="white"
                width="3"
                size="20"
              ></v-progress-circular
            ></span>
            <span v-else>Update</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
// import User from '~/assets/js/api/User'
export default {
  name: 'EditProfile',
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
  },
  mounted() {
    $('.form-container input, .form-container textarea').on(
      'focusin',
      function () {
        $(this).parent().find('label').addClass('active')
      }
    )
    $('.form-container input, .form-container textarea').on(
      'focusout',
      function () {
        if (!this.value) {
          $(this).parent().find('label').removeClass('active')
        }
      }
    )
  },
  methods: {
    triggerclick() {
      $('#profile-image').click()
    },
    async editProfile(e) {
      this.loading = true
      await this.$store.dispatch(
        'user/updateCurrentUser',
        new FormData(e.target)
      )
      this.loading = false
      // User.updateProfile(new FormData(e.target))
      //   .then(() => {
      //     this.$root.$emit('alertNotification', { message: 'Profile Updated' })
      //   })
      //   .catch((err) => {})
    },
    async displayImage(data) {
      if (data.target.files[0]) {
        const reader = await new FileReader()
        await reader.readAsDataURL(data.target.files[0])
        reader.onload = await function (event) {
          const imgElement = document.createElement('img')
          imgElement.src = event.target.result
          imgElement.onload = function (e) {
            const canvas = document.createElement('canvas')
            const MAX_WIDTH = 400
            const scaleSize = MAX_WIDTH / e.target.width
            canvas.width = MAX_WIDTH
            canvas.height = e.target.height * scaleSize
            const ctx = canvas.getContext('2d')
            ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)

            const srcEncoded = ctx.canvas.toDataURL(e.target, 'image/jpeg')
            const profileDisplay = document.querySelectorAll('#profile-display')
            for (let i = 0; i < profileDisplay.length; i++) {
              $(profileDisplay[i]).attr('src', srcEncoded)
            }
            this.image = JSON.stringify(srcEncoded)
          }
        }
      }
    },
  },
}
</script>

<style scoped>
.flex-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
}

.img-div {
  border-radius: 50%;
  width: 200px;
  height: 200x;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 14px 0 var(--brand-color-bg);
}
.img-div button {
  position: absolute;
  background: var(--brand-color-bg);
  bottom: 15px;
  right: 15px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  border: none;
}
img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: inherit;
}
</style>
