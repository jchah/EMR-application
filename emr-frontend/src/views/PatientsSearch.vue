<template>
<!-- <section class="hero is-primary is-fullheight-with-navbar"> -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  <section class="hero is-fullheight-with-navbar section has-background-info-light">
    <div v-if="!hasSearched" class="columns is-centered">
      <div class="column is-half mt-5">
        <h1 class="title">Patient Search</h1>
        <div class="box">
          <div v-if="successMessage" class="notification is-success">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="notification is-danger">
            {{ errorMessage }}
            {{ errorMessage }}
          </div>
          <form @submit.prevent="submitForm">
            <div class="columns">
              <div class="column">
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
                  <label class="label">Date of Birth</label>
                  <div class="control">
                    <input class="input" type="date" v-model="dateOfBirth">
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Sex</label>
                  <div class="select is-fullwidth">
                    <select v-model="sex">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Health Card</label>
                  <div class="control">
                    <input class="input" type="text" v-model="cardNumber">
                  </div>
                </div>
                <div class="field">
                  <label class="label">Phone Number</label>
                  <div class="control">
                    <input class="input" type="text" v-model="phoneNum">
                  </div>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Address</label>
              <div class="control">
                <input class="input" type="text" v-model="address">
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="text" v-model="email">
              </div>
            </div>
            <div class="field">
              <label class="label">Emergency Contact Name</label>
              <div class="control">
                <input class="input" type="text" v-model="emergencyContactName">
              </div>
            </div>
            <div class="field">
              <label class="label">Emergency Contact Relationship</label>
              <div class="control">
                <input class="input" type="text" v-model="emergencyContactRelationship">
              </div>
            </div>
            <div class="field">
              <label class="label">Emergency Contact Phone</label>
              <div class="control">
                <input class="input" type="text" v-model="emergencyContactPhone">
              </div>
            </div>
<!--            <div class="field">-->
<!--              <label class="label">Conditions</label>-->
<!--              <div class="control">-->
<!--                <multiselect v-model="selectedConditions" :options="conditions" label="name" track-by="_id" multiple close-on-select="false" placeholder="Select conditions"></multiselect>-->
<!--              </div>-->
<!--            </div>-->
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-primary" @click="submitForm">Search</button>
              </div>
              <div class="control">
                <button type="button" class="button is-link" @click="resetForm">Reset</button>
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
        <br>
        <h1 class="title">Filtered Patients</h1>
        <div class="box">
          <table class="table is-fullwidth has-text-centered ">
          <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Sex</th>
            <th>Address</th>
            <th>Health Card</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="patient in paginatedPatients" :key="patient._id">
            <td>{{ patient.firstName }}</td>
            <td>{{ patient.lastName }}</td>
            <td>{{ patient.dateOfBirth }}</td>
            <td>{{ patient.sex }}</td>
            <td>{{ patient.address }}</td>
            <td>{{ patient.cardNumber }}</td>
            <td>
              <button class="button is-link" @click="goToPatientProfile(patient._id)">Profile</button>
              <button class="button is-danger" @click="deletePatient(patient._id)">Delete</button>

            </td>
          </tr>
          </tbody>
        </table>
        </div>
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
          <button class="pagination-previous" @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <button class="pagination-next" @click="nextPage" :disabled="currentPage * pageSize >= filteredPatients.length">Next</button>
          <ul class="pagination-list">
            <li><a class="pagination-link" :class="{'is-current': n === currentPage}" v-for="n in Math.ceil(filteredPatients.length / pageSize)" :key="n" @click="currentPage = n">
              {{ n }}
            </a></li>
          </ul>
        </nav>
        <div class="control">
          <button class="button is-link pl-4" @click="showSearch">Go Back to Search</button>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import axios from "axios";
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

const API_URL = 'http://localhost:3000'

export default {
  components: { Multiselect },
  data() { // data
    return {
      currentPage: 1,
      pageSize: 10,
      patientFirstName: '',
      lastName: '',
      dateOfBirth: '',
      address: '',
      sex: '',
      cardNumber: '',
      patients: [],
      conditions: [],
      selectedConditions: [],
      filteredPatients: [],
      hasSearched: false,
      phoneNum: '',
      email: '',
      emergencyContactName: '',
      emergencyContactRelationship: '',
      emergencyContactPhone: '',
      successMessage: '',
      errorMessage: ''
    };
  },
  setup() {
    let token = localStorage.getItem('token') || null
    
    if(!token) {
      window.location = ('/')
    }
  },
  computed: {
    paginatedPatients() { // List of the patients that should be displayed on the current page of pagination
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredPatients.slice(start, end);
    }
  },
  methods: {
    nextPage() { // Goes to the next page of pagination
      if ((this.currentPage * this.pageSize) < this.filteredPatients.length) {
        this.currentPage++;
      }
    },
    prevPage() { // goes to the previous page of pagination
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    async fetchPatients() { // Fetches an array of all the patients from the database
      try {
        const response = await axios.get(`${API_URL}/patients`);
        this.patients = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deletePatient(patientId) { // Deletes a selected patient and all things tied to that patient
      try {
        await axios.delete(`${API_URL}/patients/${patientId}`);
        await axios.delete(`${API_URL}/appointments/patient/${patientId}`)

        this.successMessage = 'Patient deleted successfully.';
        this.filteredPatients = this.filteredPatients.filter(patient => patient._id !== patientId);
      } catch (error) {
        console.error(error);
      }
      this.showSearch()
      location.reload()
    },
    submitForm() { // For each parameter in the search for patients page, find which patients match & add return an array (that is used in the table)
      this.filteredPatients = this.patients.filter(patient => {
        const firstNameMatch = this.patientFirstName === '' || patient.firstName.toLowerCase().includes(this.patientFirstName.toLowerCase());
        const lastNameMatch = this.lastName === '' || patient.lastName.toLowerCase().includes(this.lastName.toLowerCase());
        const dateOfBirthMatch = this.dateOfBirth === '' || patient.dateOfBirth === this.dateOfBirth;
        const addressMatch = this.address === '' || patient.address.toLowerCase().includes(this.address.toLowerCase());
        const cardNumberMatch = this.cardNumber === '' || patient.cardNumber.toLowerCase().includes(this.cardNumber.toLowerCase());
        const sexMatch = this.sex === '' || patient.sex.toLowerCase().includes(this.sex.toLowerCase());
        const conditionsMatch = this.selectedConditions.length === 0 || this.selectedConditions.every(condition => patient.conditions.includes(condition._id));
        return firstNameMatch && lastNameMatch && dateOfBirthMatch && addressMatch && cardNumberMatch && sexMatch && conditionsMatch;
      });

      this.hasSearched = true;
      localStorage.setItem('searchResults', JSON.stringify(this.filteredPatients));
      localStorage.setItem('searchState', JSON.stringify({
        patientFirstName: this.patientFirstName,
        lastName: this.lastName,
        dateOfBirth: this.dateOfBirth,
        address: this.address,
        sex: this.sex,
        cardNumber: this.cardNumber,
        phoneNum: this.phoneNum,
        email: this.email,
        emergencyContactName: this.emergencyContactName,
        emergencyContactRelationship: this.emergencyContactRelationship,
        emergencyContactPhone: this.emergencyContactPhone,
        selectedConditions: this.selectedConditions,
        hasSearched: this.hasSearched
      }));
    },
    showSearch() { // Shows the two different pages (search & table)
      this.hasSearched = false;
      localStorage.removeItem('searchResults');
      localStorage.removeItem('searchState');
    },
    goToPatientProfile(patient_id) { // Sends you to the patient profile page differentiated through the patiends id
      this.$router.push({ name: 'PatientProfile', params: { patient: patient_id } });
    },
    async createNewPatient() { // Creates a patient using the information provided on the search page
      let newPatient = {
        firstName: this.patientFirstName,
        lastName: this.lastName,
        dateOfBirth: this.dateOfBirth,
        sex: this.sex,
        address: this.address,
        contact: {
          phone: this.phoneNum,
          email: this.email,
        },
        emergencyContact: {
          name: this.emergencyContactName,
          relationship: this.emergencyContactRelationship,
          phone: this.emergencyContactPhone
        },
        cardNumber: this.cardNumber,
        conditions: this.selectedConditions.map(condition => condition._id),
        contactPreference: "email"
      };

      if (this.patientFirstName !== '' && this.lastName !== '' && this.dateOfBirth !== '' && this.sex !== '' && this.address !== '' && this.phoneNum !== '' && this.email !== '' && this.emergencyContactName !== '' && this.emergencyContactRelationship !== '' && this.emergencyContactPhone !== '' && this.cardNumber !== '') {
        try {
          await axios.post(`${API_URL}/patients`, newPatient);
          this.successMessage = 'New patient added successfully.';
          this.errorMessage = '';
          this.resetForm();
          await this.fetchPatients();
        } catch (error) {
          this.successMessage = '';
          this.errorMessage = 'Failed to add new patient.';
        }
      } else {
        this.successMessage = '';
        this.errorMessage = 'Please ensure you fill out all fields.';
      }
    },
    resetForm() { // Resets all the values on the form to ''
      this.patientFirstName = '';
      this.lastName = '';
      this.dateOfBirth = '';
      this.address = '';
      this.sex = '';
      this.cardNumber = '';
      this.phoneNum = '';
      this.email = '';
      this.emergencyContactName = '';
      this.emergencyContactRelationship = '';
      this.emergencyContactPhone = '';
      this.selectedConditions = [];
    }
  },
  created() { // Fetches the patients 
    this.fetchPatients();
    let storedResults = localStorage.getItem('searchResults');
    let storedState = localStorage.getItem('searchState');
    if (storedResults && storedState) {
      this.filteredPatients = JSON.parse(storedResults);
      Object.assign(this, JSON.parse(storedState));
    }
  }
};
</script>

<style>
.container {
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
