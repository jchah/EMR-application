<script setup>
</script>

<template>
  <div class="dashboard">
    <h2>Welcome to the EMR Application</h2>
    <p>This is the main dashboard where you can see an overview of the system's status and quick links to various sections.</p>
    <div class="cards">
      <div class="card">
        <h3>Patients</h3>
        <p>View and manage patient records</p>
      </div>
      <div class="card">
        <h3>Appointments</h3>
        <p>View and manage appointments</p>
      </div>
      <div class="card">
        <h3>Settings</h3>
        <p>Configure system settings</p>
      </div>
    </div>
  </div>
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
