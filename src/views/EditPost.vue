<template>
  <div>
    <h3>Edycja posta nr: {{ $route.params.id }}</h3>
    <div>
      <p>Autor: {{ post.lead }}</p>
      <label>
        Tytuł:
        <input type="text" v-model="post.title" />
      </label>
      <p>
        <textarea
          name="post-content"
          cols="50"
          rows="30"
          v-model="post.content"
        />
      </p>
      <router-link tag="button" to="/">wstecz</router-link>
      <button @click="updatePost">aktualizuj</button>
    </div>
  </div>
</template>

<script>
import { Axios } from '@/axios';
import { format } from 'date-fns';

export default {
  data() {
    return {
      post: '',
      errors: [],
      postDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };
  },

  methods: {
    async updatePost() {
      const fd = new FormData();

      fd.append('title', this.post.title);
      fd.append('lead', this.post.lead);
      fd.append('c_date', this.postDate);

      fd.append('content', this.post.content);

      try {
        await Axios.post(`/posts/${this.$route.params.id}`, fd);
      } catch (e) {
        this.errors.push(e);
      }
    },
  },

  created() {
    console.log(this.$route.params);
    Axios.get(`/posts/${this.$route.params.id}`)
      .then((response) => (this.post = response.data.post))
      .catch((e) => this.errors.push(e));
  },
};
</script>

<style lang="scss" scoped></style>
