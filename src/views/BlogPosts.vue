<template>
  <div>
    <h2>Posts</h2>
    <p v-if="dataLoading">trwa wczytywanie postów...</p>
    <router-link
      v-else
      tag="p"
      :to="{ name: 'single-post', params: { id: post.id } }"
      v-for="post in posts"
      :key="post.id"
      >{{ post.title }}
    </router-link>

    <router-link tag="button" to="/">wstecz</router-link>
    <button @click="showMorePosts">pokaż więcej</button>
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
      dataLoading: false,
    };
  },

  methods: {
    showMorePosts() {
      this.dataLoading = true;

      console.log(this.pagination.current_page);
      if (this.pagination.current_page < this.pagination.number_of_pages) {
        Axios.get(`/posts?page=${++this.pagination.current_page || 1}`)
          .then((response) => {
            this.pagination = response.data.pagination;
            this.posts = response.data.posts;
          })
          .catch((e) => this.errors.push(e));
      }
      this.dataLoading = false;
    },
  },
  //* do usuniecia
  async created() {
    // try {
    //   this.dataLoading = true;

    //   const response = await Axios.get('/posts');
    //   this.posts = response.data.posts;
    //   this.pagination = response.data.pagination;
    // } catch (e) {
    //   this.errors.push(e);
    // }

    // this.dataLoading = false;

    this.showMorePosts();
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
