<template>
  <div>
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
    <router-link tag="button" to="/">usuń</router-link>
  </div>
</template>

<script>
import { Axios } from '@/axios';

export default {
  data() {
    return {
      post: '',
      errors: [],
    };
  },
  created() {
    Axios.get(`/posts/${this.$route.params.id}`)
      .then((response) => (this.post = response.data.post))
      .catch((e) => this.errors.push(e));
  },
};
</script>

<style lang="scss" scoped></style>
