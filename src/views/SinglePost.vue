<template>
  <div>
    <div v-if="!dataProcessing">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <p>
        <img
          class="post-image"
          :src="$store.state.APIDomain + post.image"
          :alt="post.lead"
        />
      </p>
      <p>pojedyńczy post nr: {{ $route.params.id }}</p>
      <div v-if="isModalOpen" class="confirm-modal">
        <p>Czy na pewno usunąć ?</p>
        <button :disabled="dataProcessing" @click="deletePost">TAK</button>
        <button :disabled="dataProcessing" @click="toggleModal">NIE</button>
      </div>
      <router-link tag="button" to="/posts">wstecz</router-link>
      <router-link
        tag="button"
        :to="{ name: 'edit-post', params: { id: post.id } }"
        >edytuj</router-link
      >
      <button @click="toggleModal">usuń</button>
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
      isModalOpen: false,
    };
  },
  methods: {
    async deletePost() {
      this.dataProcsesing = true;
      try {
        console.log('usuwanie');

        await Axios.delete(`/posts/${this.$route.params.id}`);
      } catch (e) {
        console.log(this.$route);
        this.errors.push(e);
      }

      this.$router.push('/posts');

      this.dataProcessing = false;
    },

    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
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

<style lang="scss" scoped>
.post-image {
  width: 640px;
  height: 360px;
  border: 2px solid black;
  padding: 10px;
  border-radius: 10px;
}

.confirm-modal {
  p {
    width: 100%;
    font-size: 22px;
  }
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 20%);
  background-color: coral;
  color: white;
  width: 500px;
  height: 220px;
  border: 2px solid black;
  padding: 10px;
  border-radius: 10px;
}
</style>
