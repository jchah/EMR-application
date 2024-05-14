<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Navbar.vue';
</script>

<template>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  <div id="app">
    <Header></Header>
    <div class="main-layout">
      <Sidebar />
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
  height: 100vh;
}

.main-layout {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  overflow-y: auto;
}

header {
  background-color: #42b883;
  color: white;
  padding: 20px;
  text-align: center;
}

.sidebar {
  width: 250px;
  background-color: #333;
  color: white;
  padding: 20px;
}
</style>
