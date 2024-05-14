<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
      <section class="section has-background-white-ter">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
              <div class="container">
                  <div class="columns is-centered">
                      <div class="column is-half">
                      <h1 class="title">Search For Patient</h1>
                          <div class="box">
                              <form @submit.prevent="submitForm">
                                  <div class="field">
                                  <label class="label">Patient First Name</label>
                                  <div class="control">
                                      <input class="input" type="text" v-model="patientFirstName" required>
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
                                      <input class="input" type="text" v-model="lastName" required>
                                  </div>
                                  </div>
                          
                                  <div class="field">
                                  <label class="label">DOB</label>
                                  <div class="control">
                                      <input class="input" type="date" v-model="dob" required>
                                  </div>
                                  </div>
                          
                                  <div class="field">
                                  <label class="label">Address</label>
                                  <div class="control">
                                      <input class="input" type="text" v-model="address" required>
                                  </div>
                                  </div>
                          
                                  <div class="field is-grouped">
                                  <div class="control">
                                      <button class="button is-primary" type="submit">Submit</button>
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
      </section>
  
    
  
</template>

<script>
export default {
  data() {
    return {
      patientFirstName: '',
      middleInitial: '',
      lastName: '',
      dob: '',
      address: '',
      patients: [],
      filteredPatients 
    };
  },
  methods: {
    submitForm() {
      this.filteredPatients = this.patients.filter(patient => {
        const firstNameMatch = this.patientFirstName === '' || patient.firstName.toLowerCase().includes(this.patientFirstName.toLowerCase());
        const middleInitialMatch = this.middleInitial === '' || patient.middleInitial.toLowerCase() === this.middleInitial.toLowerCase();
        const lastNameMatch = this.lastName === '' || patient.lastName.toLowerCase().includes(this.lastName.toLowerCase());
        const dobMatch = this.dob === '' || patient.dob === this.dob;
        const addressMatch = this.address === '' || patient.address.toLowerCase().includes(this.address.toLowerCase());

        return firstNameMatch && middleInitialMatch && lastNameMatch && dobMatch && addressMatch;
      });
    },
    resetForm() {
      this.patientFirstName = '';
      this.middleInitial = '';
      this.lastName = '';
      this.dob = '';
      this.address = '';
      
    }
  },
  async mounted() {
    try {
      const response = await axios.get(`http://localhost:3000/logout`, {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      this.patients = response.data
    } catch (error) {
      console.log(error)
    }
  }
};
</script>

<style scoped>
.body {
  background-color: #111;
}
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
</style>