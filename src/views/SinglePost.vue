<template>
  <div>
    <div v-if="!dataProcessing">
      <h3>pojedyńczy post nr: {{ $route.params.id }}</h3>
      <p>{{ post.content }}</p>
      <p>
        <img :src="$store.state.APIDomain + post.image" :alt="post.lead" />
      </p>
      <router-link tag="button" to="/posts">wstecz</router-link>
      <router-link
        tag="button"
        :to="{ name: 'edit-post', params: { id: post.id } }"
        >edytuj</router-link
      >
      <button @click="deletePost">usuń</button>
    </div>
    <div v-else>Trwa wczytywanie danych...</div>
  </div>
</template>

<script>
import { Axios } from '@/axios';

export default {
  data() {
    return {
      post: '',
      errors: [],
      dataProcessing: true,
    };
  },
  methods: {
    async deletePost() {
      try {
        console.log('usuwanie');
        this.dataProcsesing = true;

        await Axios.delete(`/posts/${this.$route.params.id}`);
      } catch (e) {
        console.log(this.$route);
        this.errors.push(e);
      }

      this.dataProcessing = false;
    },
  },
  async created() {
    try {
      const response = await Axios.get(`/posts/${this.$route.params.id}`);
      this.post = response.data.post;
    } catch (e) {
      this.errors.push(e);
    }
    this.dataProcessing = false;
  },
};
</script>

<style lang="scss" scoped></style>
