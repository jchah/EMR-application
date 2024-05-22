<script setup>
</script>

<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">

  <section class="section">
    <div class="container">
      <div class="content has-text-centered">
        <h1 class="title">Welcome to the EMR Application</h1>
        <p>This is the main dashboard where you can see an overview of the system's status and quick links to various sections.</p>
      </div>

      <div class="columns is-multiline is-centered">
        <div class="column is-one-third">
          <div class="card has-text-centered">
            <header class="card-header">
              <p class="card-header-title is-centered">Patients</p>
            </header>
            <div class="card-content">
              <div class="content">View and manage patient records</div>
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card has-text-centered">
            <header class="card-header">
              <p class="card-header-title is-centered">Appointments</p>
            </header>
            <div class="card-content">
              <div class="content">View and manage appointments</div>
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card has-text-centered">
            <header class="card-header">
              <p class="card-header-title is-centered">Settings</p>
            </header>
            <div class="card-content">
              <div class="content">Configure system settings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.dashboard {
  text-align: center;
  padding-top: 2%;
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
