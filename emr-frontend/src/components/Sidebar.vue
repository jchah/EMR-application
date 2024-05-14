<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const menuItems = ref([
  { name: 'Dashboard', route: '/' },
  { name: 'Patients', route: '/patients' },
  { name: 'Appointments', route: '/appointments' },
  { name: 'Settings', route: '/settings' }
]);

function navigate(route) {
  router.push(route);
}
</script>

<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li v-for="item in menuItems" :key="item.route">
          <a href="#" @click.prevent="navigate(item.route)">{{ item.name }}</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #333;
  color: white;
  padding: 20px;
}

.sidebar a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sidebar a:hover {
  background-color: #555;
}
</style>
