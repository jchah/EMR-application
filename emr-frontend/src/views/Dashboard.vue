<script setup>
</script>

<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">

  <section class="section">
    <div class="container">
      <div class="content has-text-centered">
        <h1 class="title">Welcome to the EMR Application</h1>
      </div>

      <div class="columns is-multiline is-centered is-variable is-8">
        <RouterLink :to="'/patients'">
          <div class="column is-narrow">
            <div class="card has-text-centered" style="width: 300px;">
              <header class="card-header">
                <p class="card-header-title is-centered">Patients</p>
              </header>
              <div class="card-content">
                <div class="content">View and manage patient records</div>
              </div>
            </div>
          </div>
        </RouterLink>
        
        <RouterLink :to="'/calendar'">
          <div class="column is-narrow">
            <div class="card has-text-centered" style="width: 300px;">
              <header class="card-header">
                <p class="card-header-title is-centered">Appointments</p>
              </header>
              <div class="card-content">
                <div class="content">View and manage appointments</div>
              </div>
            </div>
          </div>
        </RouterLink>
        
        <RouterLink :to="'/test-dashboard'">
          <div class="column is-narrow">
            <div class="card has-text-centered" style="width: 300px;">
              <header class="card-header">
                <p class="card-header-title is-centered">Tests</p>
              </header>
              <div class="card-content">
                <div class="content">View and manage tests</div>
              </div>
            </div>
          </div>
        </RouterLink>
        
      </div>
    </div>
  </section>
</template>

<script>
import { useRouter } from 'vue-router';
</script>