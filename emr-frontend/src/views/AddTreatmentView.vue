<template>
  <section class="section">
    <p class="title">Add New Treatment</p>
    <div id="all" class="box m-5" v-if="patient">
      <div id="treatment-list">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Drug Brand Name</label>
              <div class="control">
                <input class="input" type="text" id="drug-brand-name">
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Search Health Canada</label>
              <div class="control">
                <button class="button is-success" @click="drugSearch">Search</button>
              </div>
            </div>
          </div>
        </div>
        <table v-if="drugResults.length" class="table box is-fullwidth">
          <thead>
            <tr>
              <th>Drug Identification Number</th>
              <th>Drug Brand Name</th>
              <th>Last Updated</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="drug in paginatedDrugResults" :key="drug.drug_identification_number">
              <td>{{ drug.drug_identification_number }}</td>
              <td>{{ drug.brand_name }}</td>
              <td>{{ drug.last_update_date }}</td>
              <td><button class="button is-success" @click="drugSelect(drug.drug_code)">Select</button></td>
            </tr>
          </tbody>
        </table>
        <nav class="pagination is-centered" role="navigation" aria-label="pagination" v-if="totalPages > 1">
          <a class="pagination-previous" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</a>
          <a class="pagination-next" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</a>
          <ul class="pagination-list">
            <li v-for="page in totalPages" :key="page">
              <a class="pagination-link" :class="{ 'is-current': page === currentPage }" @click="changePage(page)">{{ page }}</a>
            </li>
          </ul>
        </nav>
      </div>
      <hr>
      <p v-if="selectedDrug">Selected drug: {{ selectedDrug.brand_name }}</p>
      <form @submit.prevent="addTreatment">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Condition Name</label>
              <div class="control">
                <input class="input" type="text" v-model="newTreatment.condition" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Start Date</label>
              <div class="control">
                <input class="input" type="date" v-model="newTreatment.startDate" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Dosage</label>
              <div class="control select">
                <select name="dosage" id="dosage" v-model="newTreatment.dosage" v-if="selectedDrug">
                  <option v-for="option in selectedDrug.dosage" :value="option.pharmaceutical_form_name" :key="option.pharmaceutical_form_name">{{ option.pharmaceutical_form_name }}</option>
                </select>
                <input class="input" type="text" disabled v-else>
              </div>
            </div>
            <div class="field">
              <label class="label">Frequency</label>
              <div class="control">
                <input class="input" type="text" v-model="newTreatment.frequency" required>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Prescribing Physician</label>
              <div class="control">
                <input class="input" type="text" v-model="newTreatment.prescribingPhysician" required>
              </div>
            </div>
            <div class="field">
              <label class="label">End Date</label>
              <div class="control">
                <input class="input" type="date" v-model="newTreatment.endDate" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Route</label>
              <div class="control select">
                <select v-if="selectedDrug" name="route" id="route" v-model="newTreatment.route">
                  <option v-for="option in selectedDrug.routes" :value="option.route_of_administration_name" :key="option.route_of_administration_code">{{ option.route_of_administration_name }}</option>
                </select>
                <input class="input" type="text" disabled v-else>
              </div>
            </div>
          </div>
        </div>
        <div class="columns has-text-centered">
          <div class="column">
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-primary" type="submit">Submit</button>
              </div>
            </div>
          </div>
          <div class="column">
            <button class="button is-info" @click="clearTreatmentForm">Clear Form</button>
          </div>
          <div class="column">
            <button class="button is-danger" @click="goBack">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

const API_URL = 'https://emr-application.onrender.com'

export default {
  data() {
    return {
      patient: null,
      validSearch: true,
      drugs: [],
      drugResults: [],
      selectedDrug: null,
      newTreatment: {
        condition: '',
        name: '',
        dosage: '',
        frequency: '',
        route: '',
        startDate: '',
        endDate: '',
        prescribingPhysician: '',
        notes: ''
      },
      currentPage: 1,
      resultsPerPage: 10
    };
  },
  computed: {
    paginatedDrugResults() {
      const start = (this.currentPage - 1) * this.resultsPerPage;
      const end = start + this.resultsPerPage;
      return this.drugResults.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.drugResults.length / this.resultsPerPage);
    }
  },
  methods: {
    async allDrugs() {
      const response = await axios.get(`https://health-products.canada.ca/api/drug/drugproduct/?lang=en&type=json`)
      this.drugs = response.data;
    },
    drugSearch() {
      const drugName = document.getElementById('drug-brand-name').value.toUpperCase();
      this.drugResults = this.drugs.filter(drug => drug.brand_name.includes(drugName));
      this.currentPage = 1;  // Reset to the first page whenever a new search is made
      document.getElementById('drug-brand-name').value = '';
    },
    async drugSelect(code) {
      this.drugResults = [];
      const drug = await axios.get(`https://health-products.canada.ca/api/drug/drugproduct/?lang=en&type=json&id=${code}`);
      const route = await axios.get(`https://health-products.canada.ca/api/drug/route/?lang=en&type=json&id=${code}`);
      const dosage = await axios.get(`https://health-products.canada.ca/api/drug/form/?lang=en&type=json&id=${code}`);
      this.selectedDrug = drug.data;
      this.selectedDrug.routes = route.data;
      this.selectedDrug.dosage = dosage.data;
      this.newTreatment.name = drug.data.brand_name;
      this.newTreatment.notes = drug.data.drug_code;
      console.log(this.selectedDrug)
    },
    async getPatient() {
      try {
        const response = await axios.get(`${API_URL}/patients/${this.$route.params.patient}`);
        this.patient = response.data;
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
      }
    },
    clearTreatmentForm() {
      this.newTreatment = {
        condition: '',
        name: '',
        dosage: '',
        frequency: '',
        route: '',
        startDate: '',
        endDate: '',
        prescribingPhysician: '',
        notes: ''
      };
    },
    goBack() {
      this.$router.push(`/patients/${this.$route.params.patient}`);
    },
    async addTreatment() {
      if (this.newTreatment.condition !== '' && this.newTreatment.prescribingPhysician !== '') {
        if (this.newTreatment.name === '') {
          this.newTreatment.name = 'None';
          this.newTreatment.dosage = 'N/A';
          this.newTreatment.frequency = 'N/A';
          this.newTreatment.route = 'N/A';
          this.newTreatment.startDate = 'N/A';
          this.newTreatment.endDate = 'N/A';
        }
        try {
          const response = await axios.post(`${API_URL}/treatments`, this.newTreatment);
          const treatmentID = response.data._id;
          const patientResponse = await axios.get(`${API_URL}/patients/${this.$route.params.patient}`);
          const treatments = patientResponse.data.treatments;
          treatments.push(treatmentID);

          await axios.put(`${API_URL}/patients/${this.$route.params.patient}`, { treatments });
          this.clearTreatmentForm();
          this.goBack();
        } catch (error) {
          console.error('Failed to add new treatment:', error);
        }
      } else {
        console.error('Please ensure you fill out all fields.');
      }
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  },
  created() {
    this.getPatient();
    this.allDrugs();
  }
}
</script>

<style scoped>
#all {
  padding: 2%;
}
</style>
