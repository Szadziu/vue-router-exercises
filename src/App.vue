<template>
  <div id="app">
    <h1>Blog</h1>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

button {
  padding: 20px 10px;
  text-transform: uppercase;
  margin: 0 50px;
  cursor: pointer;
}
</style>
