<template>
  <div>
    <p>
      <input
        v-model="postLead"
        type="text"
        placeholder="wpisz imię..."
        :disabled="dataProcessing"
      />
    </p>
    <p>
      <input
        v-model="postTitle"
        type="text"
        placeholder="wpisz tytuł..."
        :disabled="dataProcessing"
      />
    </p>
    <p>
      <textarea
        name="post-content"
        cols="50"
        rows="30"
        v-model="postContent"
        placeholder="treść posta..."
        :disabled="dataProcessing"
      ></textarea>
    </p>
    <input type="file" @change="getImage" :disabled="dataProcessing" />
    <router-link v-if="!dataProcessing" tag="button" to="/">wstecz</router-link>
    <button @click="sendPost()" :disabled="dataProcessing">
      {{ dataProcessing ? 'trwa wysyłanie' : 'wyślij' }}
    </button>
  </div>
</template>

<script>
import { Axios } from '@/axios';

export default {
  data() {
    return {
      postTitle: '',
      postLead: '',
      postContent: '',
      postImage: '',
      errors: [],
      dataProcessing: false,
    };
  },

  methods: {
    getImage(e) {
      if (e.target.files.length > 0) {
        this.postImage = e.target.files[0];
      }
    },

    async sendPost() {
      this.dataProcessing = true;

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

      this.$router.push('/posts');

      this.dataProcessing = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
