<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <div class="container">
      <div v-if="!hasSearched" class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Search For Patient</h1>
          <div class="box">
            <form @submit.prevent="submitForm">
              <div class="field">
                <label class="label">Patient First Name</label>
                <div class="control">
                  <input class="input" type="text" v-model="patientFirstName">
                </div>
              </div>

              <div class="field">
                <label class="label">Middle Initial</label>
                <div class="control">
                  <input class="input" type="text" v-model="middleInitial">
                </div>
              </div>

              <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                  <input class="input" type="text" v-model="lastName">
                </div>
              </div>

              <div class="field">
                <label class="label">DOB</label>
                <div class="control">
                  <input class="input" type="date" v-model="dob">
                </div>
              </div>

              <div class="select is-fullwidth">
                    <label class="label">Sex</label>
                    <select v-model="sex">
                    <option value="Male">Male</option>
                    <option value="Femals">Female</option>
                    </select>
                </div>
                <br><br><br>
              <div class="field">
                <label class="label">Address</label>
                <div class="control">
                  <input class="input" type="text" v-model="address">
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-primary" @click="submitForm">Submit</button>
                </div>
                <div class="control">
                  <button class="button is-link" @click="resetForm">Reset</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>



<script>
import axios from "axios";

export default {
  data() {
    return {
      patientFirstName: '',
      middleInitial: '',
      lastName: '',
      dob: '',
      address: '',
      healthCards: [],
      filteredPatients: [],
      hasSearched: false
    };
  },
  methods: {
    async fetchHealthCards() {
      try {
        const response = await axios.get(`http://localhost:3000/healthcards`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        this.healthCards = response.data
        console.log(this.healthCards)
      } catch (error) {
        console.log(error)
      }
    },

    submitForm() {
      this.filteredPatients = this.healthCards.filter(patient => {
        const firstNameMatch = this.patientFirstName === '' || patient.firstName.toLowerCase().includes(this.patientFirstName.toLowerCase());
        const middleInitialMatch = this.middleInitial === '' || patient.middleInitial.toLowerCase() === this.middleInitial.toLowerCase();
        const lastNameMatch = this.lastName === '' || patient.lastName.toLowerCase().includes(this.lastName.toLowerCase());
        const dobMatch = this.dob === '' || patient.dob === this.dob;
        const addressMatch = this.address === '' || patient.address.toLowerCase().includes(this.address.toLowerCase());

        return firstNameMatch && middleInitialMatch && lastNameMatch && dobMatch && addressMatch;
      });

      if (this.filteredPatients.length >= 1) {
        this.hasSearched = true
      }
    },
    resetForm() {
      this.patientFirstName = '';
      this.middleInitial = '';
      this.lastName = '';
      this.dob = '';
      this.address = '';
      
    }
  },
  created() {
    this.fetchHealthCards();
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
</style>