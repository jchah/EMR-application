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
                <label class="label">dateOfBirth</label>
                <div class="control">
                  <input class="input" type="date" v-model="dateOfBirth">
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
              <div class="field">
                <label class="label">Health Card</label>
                <div class="control">
                  <input class="input" type="text" v-model="healthCard">
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
      <div v-if="hasSearched" class="columns is-centered">
      <div class="column is-full">
        <div class="control">
          <button class="button is-link" @click="showSearch">< Go Back to Search  </button>
        </div>
        <h1 class="title">Filtered Patients</h1>
        <table class="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>dateOfBirth</th>
              <th>Sex</th>
              <th>Address</th>
              <th>Health Card</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in filteredPatients" :key="patient.id">
              <td>{{ patient.firstName }}</td>
              <td>{{ patient.lastName }}</td>
              <td>{{ patient.dateOfBirth }}</td>
              <td>{{ patient.sex }}</td>
              <td>{{ patient.address }}</td>
              <td>{{ patient.cardNumber }}</td>
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
      patientFirstName: '',
      lastName: '',
      dateOfBirth: '',
      address: '',
      sex: '',
      healthCard: '',
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
        console.log(this.healthCards[0].address)
      } catch (error) {
        console.log(error)
      }
    },

    submitForm() {
      this.filteredPatients = this.healthCards.filter(patient => {
        const firstNameMatch = this.patientFirstName === '' || patient.firstName.toLowerCase().includes(this.patientFirstName.toLowerCase());
        const lastNameMatch = this.lastName === '' || patient.lastName.toLowerCase().includes(this.lastName.toLowerCase());
        const dateOfBirthMatch = this.dateOfBirth === '' || patient.dateOfBirth === this.dateOfBirth;
        const addressMatch = this.address === '' || patient.address.toLowerCase().includes(this.address.toLowerCase());
        const healthCardMatch = this.healthCard === '' || patient.cardNumber.toLowerCase().includes(this.healthCard.toLowerCase());

        return firstNameMatch && lastNameMatch && dateOfBirthMatch && addressMatch && healthCardMatch;
      });

      console.log(this.filteredPatients)

      this.hasSearched = true;

      console.log(this.hasSearched);
    },
    showSearch() {
      this.hasSearched = false;
    },
    resetForm() {
      this.patientFirstName = '';
      this.lastName = '';
      this.dateOfBirth = '';
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