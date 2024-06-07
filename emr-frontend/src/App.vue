<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Navbar.vue';
</script>

<template>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  <Header></Header>
  <div id="app">
    <div class="main-layout">
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

.main-layout {
  display: flex;
  flex: 1;
}


header {
  background-color: #42b883;
  color: white;

  text-align: center;
}
</style>
