<template>
  <div id="meta-component">
    <div v-if="$route.name == 'author-author'" class="data-meta">
      <div class="author-img-div">
        <img
          v-if="author != null && author.image"
          :src="$asset('author_images/' + author.image)"
          :alt="author.name"
        />
        <VSkeletonLoader v-else type="avatar" class="loader" />
        <p class="author-created">
          <i class="bi bi-clock"></i> {{ author.relative_time }}
        </p>
      </div>
      <div class="author-content">
        <h3>{{ author.name }}</h3>
        <p v-if="author.bio">
          <i class="bi bi-pin"></i> {{ author.location }}Lagos, Ikeja
        </p>
        <VSkeletonLoader v-else type="heading" class="loader" />
        <p v-if="author.bio"></p>
        <VSkeletonLoader v-else type="paragraph" class="loader" />
      </div>
    </div>
    <div v-else class="data-meta">
      <div
        class="author-img-div"
        style="display: flex; justify-content: center"
      >
        <h3 class="tag-name font-weight-bold">
          {{ $route.params.tag.toUpperCase() }}
        </h3>
      </div>
      <div class="author-content">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
          corrupti libero autem, odio ducimus hic quis amet quae saepe atque
          porro illum earum commodi fugiat perferendis eius cumque, vitae sit.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Account from '~/assets/js/api/Account'
export default {
  name: 'MetaComponent',
  data() {
    return {
      loading: true,
      author: '',
    }
  },
  mounted() {
    if (this.$route.name === 'author-author') {
      this.setAuthor()
    }
  },
  methods: {
    async setAuthor() {
      await this.getauthor()
      if (!['', null, undefined, {}].includes(this.author)) {
        return (this.loading = false)
      }
      return Account.getAuthorByName(this.$route.params.author).then((res) => {
        this.$store.commit('author/setAuthor', res.data.data)
        this.author = res.data.data
        this.$root.$emit('authorUpdated')
        this.loading = false
      })
    },
    getauthor() {
      return (this.author = this.$store.state.author.author)
    },
  },
}
</script>
<style scoped>
.data-meta {
  position: relative;
  background: var(--colored-featured-bg);
  padding: 1rem;
  border-radius: 1rem;
}
img {
  width: 125px;
  height: 125px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}
.author-img-div {
  display: flex;
  align-items: center;
  height: 100%;
}
.author-created {
  position: absolute;
  bottom: 2%;
  left: 5%;
  margin: 0;
  font-size: 0.75rem;
}
.author-content {
  padding: 1rem;
  text-align: center;
}
.tag-name::first-letter {
  text-transform: capitalize;
}
@media screen and (min-width: 768px) {
  .data-meta {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
  }
}
</style>
