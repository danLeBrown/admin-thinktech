<template>
  <div id="dashboard">
    <h2><i class="bi bi-bar-chart"></i> Dashboard</h2>
    <div class="analytics-stat">
      <div class="analytics-container">
        <div class="content written">
          <h3>ARTICLES WRITTEN</h3>
          <div class="content-data">
            <span v-if="loading"
              ><v-progress-circular
                indeterminate
                color="white"
                width="3"
                size="20"
              ></v-progress-circular
            ></span>
            <h3 v-else>{{ analytics_stats.articles_written }}</h3>
          </div>
        </div>
      </div>
      <div class="analytics-container">
        <div class="content reads">
          <h3>ARTICLES READ</h3>
          <div class="content-data">
            <span v-if="loading"
              ><v-progress-circular
                indeterminate
                color="white"
                width="3"
                size="20"
              ></v-progress-circular
            ></span>
            <h3 v-else>{{ analytics_stats.articles_views }}</h3>
          </div>
        </div>
      </div>
      <div class="analytics-container">
        <div class="content visits">
          <h3>PROFILE VISITS</h3>
          <div class="content-data">
            <span v-if="loading"
              ><v-progress-circular
                indeterminate
                color="white"
                width="3"
                size="20"
              ></v-progress-circular
            ></span>
            <h3 v-else>{{ analytics_stats.profile_visits }}</h3>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="notifications-box">
      <h2><i class="bi bi-bell" aria-hidden="true"></i> Notifications</h2>
      <!-- <div class="notification-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iste
        totam odio cumque fugiat quaerat est optio, molestias voluptatibus
        deleniti harum eligendi blanditiis facilis, a repellat, unde tempora
        similique dignissimos.
      </div>
      <div class="notification-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero vel
        pariatur deserunt nisi commodi dolor assumenda tempore repudiandae
        corrupti delectus. Fuga alias aliquid quam doloribus non dolor, et
        consequuntur officiis.
      </div>
      <div class="notification-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis iure,
        voluptatibus repudiandae consequuntur iste eveniet laborum quae vitae
        adipisci cumque itaque eius odit id corrupti nisi exercitationem
        voluptatem debitis natus?
      </div> -->
    </div>
  </div>
</template>

<script>
import User from '~/assets/js/api/User'
export default {
  name: 'Index',
  middleware: ['auth'],
  data() {
    return {
      analytics_stats: {},
      loading: true,
    }
  },
  mounted() {
    this.setup()
  },
  methods: {
    setup() {
      User.stats()
        .then((res) => {
          this.analytics_stats = res.data.data
          this.loading = false
        })
        .catch((err) => this.$store.dispatch('alert/getAlert', err.response))
    },
  },
}
</script>

<style scoped>
#dashboard {
  margin-top: 2rem;
  height: 100%;
  align-items: center;
}
.analytics-stat {
  width: 100%;
  overflow: hidden;
  display: grid;
  padding: 1rem 0;
}
.content {
  padding: 1rem;
  width: 100%;
  min-height: 100px;
  border-radius: 1rem;
  color: #fff;
  position: relative;
  margin: 1rem 0;
}

.content-data {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
.written {
  background: #06d6a0;
  box-shadow: 0 14px 14px 0 rgba(6, 214, 160, 0.25);
}
.reads {
  background: #ffd166;
  box-shadow: 0 14px 14px 0 rgba(255, 209, 102, 0.25);
}
.visits {
  background: #ef476f;
  box-shadow: 0 14px 14px 0 rgba(239, 71, 111, 0.25);
}

.notification-content {
  margin: 0.5rem 0;
  /* padding: 0.5rem 1rem; */
}
@media screen and (min-width: 768px) {
  .analytics-stat {
    grid-template-columns: repeat(3, 1fr);
  }
  .content {
    width: 300px;
    margin: 1rem;
  }
}
</style>
