<template>
  <Suspense>
    <div class="container">
      <div class="columns">
        <div class="column is-one-third">
          <DatePicker v-model="date" class="ml-4 mt-4"/>
          <!-- No appointments yet -->
          <ul v-if="appointments.length" class="list is-hoverable">
            <li v-for="app in appointments" :key="app._id">
              {{ app.patient }}: {{ app.startTime }} - {{ app.endTime }} ({{ app.notes }})
              <button @click="deleteAppointment(app)" class="button is-small is-danger is-pulled-right">Delete</button>
            </li>
          </ul>
        </div>

        <div class="column">
          <div class="columns is-centered">
            <div class="column is-full">
              <h1 class="title mt-4">Make an Appointment</h1>
              <div class="box">
                <form @submit.prevent="makeAppointment(date)">
                  <div class="field">
                    <label class="label">Selected Date: {{ formatDate(date) }}</label>
                  </div>

                  <div class="field">
                    <label class="label">Patient Name</label>
                    <div class="control">
                      <input class="input" type="text" v-model="info.patientName" required>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Start Time</label>
                    <div class="control">
                      <input class="input" type="text" v-model="info.startTime" required>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">End Time</label>
                    <div class="control">
                      <input class="input" type="text" v-model="info.endTime" required>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Notes</label>
                    <div class="control">
                      <input class="input" type="text" v-model="info.notes" required>
                    </div>
                  </div>

                  <div class="field is-grouped">
                    <div class="control">
                      <button class="button is-primary" type="submit">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Suspense>
</template>

<script>
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import axios from 'axios';

const API_URL = "http://localhost:3000";

export default {
  components: {
    Calendar,
    DatePicker,
  },
  data() {
    return {
      date: new Date(),
      info: {
        patientName: '',
        date: '',
        startTime: '',
        endTime: '',
        notes: '',
      },
      appointments: []
    };
  },
  watch: {
    date: {
      handler(newValue) {
        this.getAppointments(newValue);
      },
      immediate: true
    }
  },
  methods: {
    async getAppointments(date) {
      try {
        const response = await axios.get(`${API_URL}/calendar/appointments`, {
          params: {
            date: date.toLocaleDateString()
          }
        });
        this.appointments = response.data;
      } catch (error) {
        console.error("Error getting data from getAppointments", error);
      }
    },
    async makeAppointment(date) {
      this.info.date = date.toLocaleDateString();
      try {
        await axios.post(`${API_URL}/appointments`, {
          patient: this.info.patientName,
          date: this.info.date,
          startTime: this.info.startTime,
          endTime: this.info.endTime,
          notes: this.info.notes
        });
        location.reload();
      } catch (error) {
        console.error("Error making appointment", error);
      }
    },
    async deleteAppointment(app) {
      try {
        await axios.delete(`${API_URL}/appointments/${app._id}`);
        location.reload();
      } catch (error) {
        console.error("Error deleting appointment", error);
      }
    },
    formatDate(date) {
      return date.toLocaleDateString();
    }
  }
};
</script>