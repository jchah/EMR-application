<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <div class="container">
      <div v-if="!hasSearched" class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Search For Patient</h1>
          <div class="box">
            <form>
              <div class="field">
                <label class="label">Patient First Name</label>
                <div class="control">
                  <input class="input" type="text" v-model="patientFirstName">
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
                    <option value="Female">Female</option>
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
              <div class="field">
                <label class="label">Phone Number</label>
                <div class="control">
                  <input class="input" type="text" v-model="phoneNum">
                </div>
              </div> 
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input" type="text" v-model="email">
                </div>
              </div> 
              <div class="field">
                <label class="label">Emergency Contact</label>
                <div class="control">
                  <input class="input" type="text" v-model="emergencyContact">
                </div>
              </div>            

              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-primary" @click="submitForm">Submit</button>
                </div>
                <div class="control">
                  <button class="button is-link" @click="resetForm">Reset</button>
                </div>
                <div class="control">
                  <button type="button" class="button is-info" @click="createNewPatient">Add New Patient</button>
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
              <th>Go To Patient Profile</th>
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
              <td><button class="button is-link" type="button" @click="goToPatientProfile(patient.cardNumber)"> - Profile - </button></td>

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
      hasSearched: false,
      phoneNum : '',
      email : '',
      emergencyContact : '',
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
        const sexMatch = this.sex === '' || patient.sex.toLowerCase().includes(this.sex.toLowerCase())

        return firstNameMatch && lastNameMatch && dateOfBirthMatch && addressMatch && healthCardMatch && sexMatch;
      });

      console.log(this.filteredPatients)

      this.hasSearched = true;

      console.log(this.hasSearched);
    },
    showSearch() {
      this.hasSearched = false;
    },
    goToPatientProfile(cardNum) {
      this.$router.push({ name: 'PatientProfile', params: { cardNum }, query: {currentPage: this.currentPage}});
    },
    async createNewPatient() {
      let newCard = {
          firstName : this.patientFirstName,
          lastName : this.lastName,
          dateOfBirth : this.dateOfBirth,
          sex : this.sex,
          address : this.address,
          contact : {
            phone : this.phoneNum,
            email : this.email,
          },
          emergencyContact : this.emergencyContact,
          cardNumber : this.healthCard
        }
        
      
      if(this.firstName !== '' && this.lastName !== '' && this.dateOfBirth !== '' && this.sex !== '' && this.address !== '' && this.phoneNum !== '' && this.email !== '' && this.emergencyContact !== '' && this.healthCard !== '') {

        console.log(newCard)

        console.log("http://localhost:3000/healthcards");
        const response = await axios.post(`http://localhost:3000/healthcards`, newCard, {
          // headers: {
          //   'Content-Type': 'application/x-www-form-urlencoded'
          // }
        });
        console.log(response.data)
      } else {
        console.log("ERROR : Please ensure you fill out all fields")
      }
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