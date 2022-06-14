<template>
  <div>
    <h3>Edycja posta nr: {{ $route.params.id }}</h3>
    <div>
      <p>Autor: {{ post.lead }}</p>
      <label>
        Tytuł:
        <input type="text" v-model="post.title" :disabled="dataProcessing" />
      </label>
      <p>
        <textarea
          name="post-content"
          cols="50"
          rows="30"
          v-model="post.content"
          :disabled="dataProcessing"
        />
      </p>
      <p>
        <input type="file" @change="getImage" :disabled="dataProcessing" />
      </p>
      <router-link v-if="!dataProcessing" tag="button" to="/posts"
        >wstecz</router-link
      >
      <button @click="updatePost" :disabled="dataProcessing">aktualizuj</button>
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
      postImage: '',
      dataProcessing: false,
    };
  },

  methods: {
    async updatePost() {
      this.dataProcessing = true;
      const fd = new FormData();

      fd.append('title', this.post.title);
      fd.append('lead', this.post.lead);
      fd.append('c_date', this.postDate);

      fd.append('content', this.post.content);
      fd.append('image', this.postImage);

      try {
        await Axios.post(`/posts/${this.$route.params.id}`, fd);
      } catch (e) {
        this.errors.push(e);
      }
      this.dataProcessing = false;
    },

    getImage(e) {
      if (e.target.files.length > 0) {
        this.postImage = e.target.files[0];
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
