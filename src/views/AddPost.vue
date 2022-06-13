<template>
  <div>
    <p>
      <input v-model="postTitle" type="text" placeholder="wpisz imię..." />
    </p>
    <p>
      <textarea
        name="post-content"
        cols="50"
        rows="30"
        v-model="postContent"
        placeholder="treść posta..."
      ></textarea>
    </p>
    <input type="file" @change="getImage" />
    <router-link tag="button" to="/">wstecz</router-link>
    <button @click="sendPost()">wyślij</button>
  </div>
</template>

<script>
import { Axios } from '@/axios';

export default {
  data() {
    return {
      postTitle: '',
      postLead: 'fdfdf',
      postContent: '',
      postImage: '',
      errors: [],
    };
  },

  methods: {
    getImage(e) {
      console.log(e);
      if (e.target.files.length > 0) {
        this.postImage = e.target.files[0];
      }
      // this.postImage
      // e.target.value = '';
    },

    async sendPost() {
      const fd = new FormData();

      fd.append('title', this.postTitle);
      fd.append('lead', this.postLead);
      fd.append('content', this.postContent);
      fd.append('image', this.postImage);

      try {
        await Axios.post('/posts', fd);
      } catch (e) {
        this.errors.push(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
