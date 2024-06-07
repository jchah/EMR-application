<template>
  <section class="hero is-link">
    <div class="hero-body is-flex is-justify-content-space-between is-align-items-center">
      <p class="title" v-if="patient">Patient Profile : {{patient.firstName + " " + patient.lastName}}</p>
      <button class="button is-light" @click="goBack">Back to Patients</button>
    </div>
  </section>

  <div v-if="patient">
    <div class="columns has-background-link-light info">
      <div class="column">
        <p class="title has-text-centered">Patient Info</p>
        <div class="columns">
          <div class="column">
            <p class="subtitle">First Name : {{ patient.firstName}}</p>
            <p class="subtitle">Last Name : {{ patient.lastName}}</p>
          </div>
          <div class="column">
            <p class="subtitle">Sex : {{ patient.sex}}</p>
            <p class="subtitle">Health Card Number : {{ patient.cardNumber}}</p>
          </div>
          <div class="column">
            <p class="subtitle">DOB : {{ patient.dateOfBirth}}</p>
            <p class="subtitle">Address : {{ patient.address}}</p>
          </div>
          <div class="column">
            <p class="subtitle">Phone : {{ patient.contact.phone}}</p>
            <p class="subtitle">Email : {{ patient.contact.email}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="columns has-background-info-light info">
      <div class="column">
        <p class="title has-text-centered">Conditions</p>
        <ul>
          <li v-for="condition in conditions" :key="condition._id">
             <p><strong>Name:</strong>  {{ condition.name }}  </p>
            <p><strong>Date of Diagnosis:</strong> {{ new Date(condition.dateOfDiagnosis).toLocaleDateString() }}</p>
            <p v-if="condition.treatment"><strong>Treatment:</strong> {{ condition.treatment.name }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="columns has-background-warning-light info">
      <div class="column">
        <p class="title has-text-centered">Appointments</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      patient: null,
      conditions: []
    };
  },
  methods: {
    async fetchPatient() {
      try {
        const response = await axios.get(`http://localhost:3000/patients/${this.$route.params.patient}`);
        this.patient = response.data;
        console.log(this.patient);
        await this.fetchConditions();
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
      }
    },
    async fetchConditions() {
      try {
        const conditionPromises = this.patient.conditions.map(id => axios.get(`http://localhost:3000/conditions/${id}`));
        const conditionResponses = await Promise.all(conditionPromises);
        this.conditions = conditionResponses.map(response => response.data);




      } catch (error) {
        console.error("Failed to fetch conditions data:", error);
      }
    },
    goBack() {
      this.$router.push('/patients');
    }
  },
  created() {
    this.fetchPatient();
  }
};
</script>

<style scoped>
.columns {
  padding: 20px;
}

.info {
  padding-bottom: 50px;
  padding-top: 50px;
}

.is-flex {
  display: flex;
}

.is-justify-content-space-between {
  justify-content: space-between;
}

.is-align-items-center {
  align-items: center;
}
</style>
