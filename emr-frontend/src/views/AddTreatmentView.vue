<template>
<div id="all" v-if="patient">
  <p class="title has-text-centered">Add New Treatment</p>
  <div id="treatment-list">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Drug Brand Name</label>
          <div class="control">
            <input type="text" class="input" id="drug-brand-name">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Search Health Canada</label>
          <div class="control">
            <button class="button is-success" @click="drugSearch()">Search</button>
          </div>
        </div>
      </div>
    </div>
    <table v-if="drugResults">
      <thead>
        <tr>
          <th>Drug Identification Number</th>
          <th>Drug Brand Name</th>
          <th>Last Updated</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="drug in drugResults">
          <td>{{ drug.drug_identification_number }}</td>
          <td>{{ drug.brand_name }}</td>
          <td>{{ drug.last_update_date }}</td>
          <td><button class="button is-success" @click="drugSelect(drug.drug_code)">Select</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <hr>
  <p v-if="selectedDrug">Selected drug: {{ selectedDrug.brand_name }}</p>
  <form @submit.prevent="addTreatment()">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Condition Name</label>
          <div class="control">
            <input type="text" class="input" v-model="newTreatment.condition" required>
          </div>
        </div>
        <div class="field">
          <label class="label">Start Date</label>
          <div class="control">
            <input type="date" class="input" v-model="newTreatment.startDate" required>
          </div>
        </div>
        <div class="field">
          <label class="label">Dosage</label>
          <div class="control select">
            <select name="route" id="dosage" v-model="newTreatment.dosage" v-if="selectedDrug">
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
            <input type="text" class="input" v-model="newTreatment.prescribingPhysician" required>
          </div>
        </div>
        <div class="field">
          <label class="label">End Date</label>
          <div class="control">
            <input type="date" class="input" v-model="newTreatment.endDate" required>
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
        <button class="button is-info" @click="clearTreatmentForm()">Clear Form</button>
      </div>
      <div class="column">
        <button class="button is-danger" @click="goBack()">Cancel</button>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import axios from 'axios'

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
      }
    };
  },
  methods: {
    async allDrugs() {
      const response = await axios.get(`https://health-products.canada.ca/api/drug/drugproduct/?lang=en&type=json`)
      this.drugs = response.data;
    },
    drugSearch() {
      const drugName = document.getElementById('drug-brand-name').value.toUpperCase();
      let initResults = [];
      for (let i = 0; i < this.drugs.length; i++) {
        if (this.drugs[i].brand_name.includes(drugName)) { initResults.push(this.drugs[i]); }
      }
      this.drugResults = initResults;
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
      console.log(this.selectedDrug)
    },
    async getPatient() {
      try {
        const response = await axios.get(`http://localhost:3000/patients/${this.$route.params.patient}`);
        this.patient = response.data;
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
      }
    },
    clearTreatmentForm() {
      this.newTreatment.condition = ''
      this.newTreatment.name = ''
      this.newTreatment.dosage = ''
      this.newTreatment.frequency = ''
      this.newTreatment.route = ''
      this.newTreatment.startDate = ''
      this.newTreatment.endDate = ''
      this.newTreatment.prescribingPhysician = ''
      this.newTreatment.notes= ''
    },
    goBack() {
      this.$router.push(`/patients/${this.$route.params.patient}`);
    },
    async addTreatment() {
      console.log(this.newTreatment)
      if (this.newTreatment.condition !== '' && this.newTreatment.prescribingPhysician !== '') {
        if(this.newTreatment.name === '') {
          this.newTreatment.name = 'None';
          this.newTreatment.dosage = 'N/A';
          this.newTreatment.frequency = 'N/A';
          this.newTreatment.route = 'N/A';
          this.newTreatment.startDate = 'N/A';
          this.newTreatment.endDate = 'N/A';
        }
        try {
          let treatmentPost = this.newTreatment;
          console.log(treatmentPost);
          const response = await axios.post(`http://localhost:3000/treatments`, treatmentPost);
          this.successMessage = 'New treatment added successfully.';
          let treatmentID = response.data._id;
          console.log("Treatment ID:")
          console.log(treatmentID);
          try {
            const response = await axios.get(`http://localhost:3000/patients/${this.$route.params.patient}`);
            const treatments = response.data.treatments;
            treatments.push(treatmentID);

            const data = {
              treatments: treatments
            };

            await axios.put(`http://localhost:3000/patients/${this.$route.params.patient}`, data)
            this.clearTreatmentForm();
            console.log("Successfully updated treatments");
            this.successMessage = 'Successfully updated treatments';
            this.goBack();
            
          } catch (e) {
            console.log("Error updating treatment: " + e);
          }
         
          await this.fetchPatients();
        } catch (error) {
          console.log(error)
            this.successMessage = '';
            this.errorMessage = 'Failed to add new patient.';
          }
        } else {
        this.successMessage = '';
        this.errorMessage = 'Please ensure you fill out all fields.';
      }
   
    }
  },
  created() {
    this.getPatient();
    this.allDrugs();
  }
}
</script>

<style>
#all {
  padding: 2%;
}
</style>