<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Conditions</h1>

      <!-- Form for adding a new condition -->
      <div class="box">
        <form @submit.prevent="addCondition">
          <div class="field">
            <label class="label">Condition Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Enter condition name" v-model="newCondition.name" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Date of Diagnosis</label>
            <div class="control">
              <input class="input" type="date" v-model="newCondition.dateOfDiagnosis" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Treatment</label>
            <div class="control">
              <input class="input" type="text" placeholder="Enter Medicine ID" v-model="newCondition.treatment">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary">Add Condition</button>
            </div>
          </div>
        </form>
      </div>

      <!-- List of conditions -->
      <table class="table is-fullwidth">
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Date of Diagnosis</th>
          <th>Treatment ID</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(condition, index) in conditions" :key="condition.id">
          <td>{{ index + 1 }}</td>
          <td>{{ condition.name }}</td>
          <td>{{ new Date(condition.dateOfDiagnosis).toLocaleDateString() }}</td>
          <td>{{ condition.treatment }}</td>
          <td>
            <button class="button is-small is-info" @click="editCondition(index)">Edit</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      conditions: [],
      newCondition: {
        name: '',
        dateOfDiagnosis: '',
        treatment: ''
      }
    };
  },
  methods: {
    addCondition() {
      this.conditions.push({ ...this.newCondition, id: this.conditions.length + 1 });
      this.newCondition = { name: '', dateOfDiagnosis: '', treatment: '' }; // Reset form
    },
    editCondition(index) {
      const condition = this.conditions[index];
      this.newCondition = { ...condition }; // Load the selected condition into the form for editing
    }
  }
};
</script>
