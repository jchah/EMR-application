<template>
  <section class="hero is-link">
    <div class="hero-body is-flex is-justify-content-space-between is-align-items-center">
      <p class="title" v-if="patient">Patient Profile : {{patient.firstName + " " + patient.lastName}}</p>
      <button class="button is-info" @click="goBack">Back to Patients</button>
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

    <div class="columns has-background-danger-light info">
      <div class="column">
        <p class="title has-text-centered">Conditions</p>
        <table class="table is-fullwidth is-striped has-background-danger-light">
          <thead>
          <tr>
            <th class="has-text-centered is-size-5">Condition Name</th>
            <th class="has-text-centered is-size-4">Date of Diagnosis</th>
            <th class="has-text-centered is-size-4">Treatment Name</th>
            <th class="has-text-centered is-size-4">Frequency</th>
            <th class="has-text-centered is-size-4">Start Date</th>
            <th class="has-text-centered is-size-4">End Date</th>
            <th class="has-text-centered is-size-4">Route</th>
            <th class="has-text-centered is-size-4">Dosage</th>
            <th class="has-text-centered is-size-4">Prescribing Physician</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="condition in conditions" :key="condition._id">
            <td class="has-text-centered">{{ condition.name }}</td>
            <td class="has-text-centered">{{ new Date(condition.dateOfDiagnosis).toLocaleDateString() }}</td>
            <td class="has-text-centered" v-if="condition.treatment">{{ condition.treatment.name }}</td>
            <td class="has-text-centered" v-if="condition.treatment">{{ condition.treatment.frequency }}</td>
            <td class="has-text-centered" v-if="condition.treatment">{{ new Date(condition.treatment.startDate).toLocaleDateString() }}</td>
            <td class="has-text-centered" v-if="condition.treatment">{{ new Date(condition.treatment.endDate).toLocaleDateString() }}</td>
            <td class="has-text-centered" v-if="condition.treatment">{{ condition.treatment.route }}</td>
            <td class="has-text-centered" v-if="condition.treatment">{{ condition.treatment.dosage }}</td>
            <td class="has-text-centered" v-if="condition.treatment">{{ condition.treatment.prescribingPhysician }}</td>
            <td class="has-text-centered" v-else colspan="7">No treatment available</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="columns has-background-warning-light info">
      <div class="column">
        <p class="title has-text-centered">Conditions</p>
        <table class="table is-fullwidth is-striped has-background-warning-light">
          <thead>
          <tr>
            <th class="has-text-centered is-size-4">Notes</th>
            <th class="has-text-centered is-size-4">Date</th>
            <th class="has-text-centered is-size-4">Start Time</th>
            <th class="has-text-centered is-size-4">End Time</th>
            <th class="has-text-centered is-size-4">Doctor</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="appointment in appointments" :key="condition._id">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
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
      conditions: [],
      treatments: [],
      appoitnments: []
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
        await this.fetchTreatments();
      } catch (error) {
        console.error("Failed to fetch conditions data:", error);
      }
    },
    async fetchTreatments() {
      try {
        const treatmentPromises = this.conditions
            .filter(condition => condition.treatment)
            .map(condition => axios.get(`http://localhost:3000/treatments/${condition.treatment}`));
        const treatmentResponses = await Promise.all(treatmentPromises);
        this.treatments = treatmentResponses.map(response => response.data);

        // Map treatments back to conditions
        this.conditions = this.conditions.map(condition => {
          if (condition.treatment) {
            condition.treatment = this.treatments.find(treatment => treatment._id === condition.treatment);
          }
          return condition;
        });
      } catch (error) {
        console.error("Failed to fetch treatments data:", error);
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
