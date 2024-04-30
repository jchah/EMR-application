<template>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <div class="columns">
      <div class="column is-one-quarter">
        <div class="box">
          <h1 class="title">{{ userProfile.username }}</h1>
          <label class="switch">
            <input type="checkbox">
            <span class="check"></span>
            <span class="label">Switch Patient</span>
          </label>
          <div class="content">
            <h2 class="subtitle">Current Conditions</h2>
            <ul>
              <li v-for="condition in userProfile.conditions" :key="condition.id">{{ condition.name }}</li>
            </ul>
          </div>
          <div class="content">
            <h2 class="subtitle">Current Medications</h2>
            <ul>
              <li v-for="medication in userProfile.medications" :key="medication.id">{{ medication.name }}</li>
            </ul>
          </div>
          <div class="content">
            <h2 class="subtitle">Upcoming Appointments</h2>
            <ul>
              <li v-for="appointment in userProfile.appointments" :key="appointment.id">{{ appointment.date }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="column">
        <!-- Content for the other 3/4 of the screen -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userProfile: {
          username: "JohnDoe",
          conditions: [{ id: 1, name: "Condition 1" }, { id: 2, name: "Condition 2" }],
          medications: [{ id: 1, name: "Medication 1" }, { id: 2, name: "Medication 2" }],
          appointments: [{ id: 1, date: "2024-05-01" }, { id: 2, date: "2024-05-15" }]
        }
      };
    }
  };
  </script>
  