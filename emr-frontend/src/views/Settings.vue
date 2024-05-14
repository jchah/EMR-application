<script setup>
</script>

<template>
    
</template>

<style scoped>
.dashboard {
  text-align: center;
}

.cards {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.card {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  width: 30%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card h3 {
  margin-bottom: 10px;
}

.card p {
  color: #6c757d;
}
</style>
