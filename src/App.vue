<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'; 

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

<style scoped>
#app {
  padding: 20px;
  font-family: sans-serif;
  max-width: 100%;
}
</style>
