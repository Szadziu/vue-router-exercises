<template>
  <div>
    <h2>Posts</h2>
    <p v-if="dataProcessing">trwa wczytywanie postów...</p>
    <router-link
      v-else
      tag="p"
      :to="{ name: 'single-post', params: { id: post.id } }"
      v-for="post in posts"
      :key="post.id"
      >{{ post.title }}
    </router-link>

    <router-link tag="button" to="/">wróć</router-link>

    <button
      :disabled="dataProcessing || currentPage <= pagination.number_of_pages"
      @click="changePage"
    >
      wstecz
    </button>

    <button
      @click="changePage"
      :disabled="dataProcessing || currentPage >= pagination.number_of_pages"
    >
      pokaż więcej
    </button>
  </div>
</template>

<script>
import { Axios } from '@/axios';

export default {
  data() {
    return {
      posts: [],
      errors: [],
      pagination: null,
      dataProcessing: false,
      currentPage: 1,
    };
  },

  methods: {
    async fetchData() {
      this.dataProcessing = true;

      try {
        const response = await Axios.get(
          `/posts?page=${this.$route.query.page}`
        );
        this.posts.push(...response.data.posts);
        this.pagination = response.data.pagination;
      } catch (e) {
        this.errors.push(e);
      }

      this.dataProcessing = false;
    },

    changePage() {
      if (
        this.pagination &&
        this.currentPage < this.pagination.number_of_pages
      ) {
        this.currentPage++;
      } else if (this.pagination && this.currentPage > 1) {
        this.currentPage--;
      }

      this.$router.push(`/posts?page=${this.currentPage}`);
    },
  },

  async created() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 10px auto;
  padding: 20px 0;
  border: 1px solid gray;
  cursor: pointer;
  width: 50%;
}
</style>
