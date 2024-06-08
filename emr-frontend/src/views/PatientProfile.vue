<template>
  <section class="hero is-link">
    <div class="hero-body is-flex is-justify-content-space-between is-align-items-center">
      <p class="title" v-if="patient">Patient Profile : {{patient.firstName + " " + patient.lastName}}</p>
      <button class="button is-info" @click="goBack">Back to Patients</button>
    </div>
  </section>

  <div class="columns has-background-info">
      <div class="column has-text-centered">
        <p class="title has-text-centered">Patient Info</p>
      </div>
    </div>

  <div v-if="patient">
    <div class="columns has-background-link-light has-text-centered info">
      <div class="column">
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

    <div class="columns has-background-danger">
      <div class="column has-text-centered">
        <p class="title has-text-centered">Conditions</p>
      </div>
    </div>

    <div class="columns has-background-danger-light info">
      <div class="column">
        <table class="table is-fullwidth has-background-danger-light">
          <thead>
          <tr>
            <th></th>
            <th class="has-text-centered is-size-4">Condition Name</th>
            <th class="has-text-centered is-size-4">Treatment Name</th>
            <th class="has-text-centered is-size-4">Frequency</th>
            <th class="has-text-centered is-size-4">Start Date</th>
            <th class="has-text-centered is-size-4">End Date</th>
            <th class="has-text-centered is-size-4">Route</th>
            <th class="has-text-centered is-size-4">Dosage</th>
            <th class="has-text-centered is-size-4">Prescribing Physician</th>
            <th></th>
            
          </tr>
          </thead>
          <tbody>
          <tr v-for="treatment in treatments" :key="treatment._id">
            <td><button class="button is-danger" @click="clearTreatment(treatment)">X</button></td>
            <td class="has-text-centered is-bold">{{ treatment.condition }}</td>
            <td class="has-text-centered">{{ treatment.name }}</td>
            <td class="has-text-centered">{{ treatment.frequency }}</td>
            <td class="has-text-centered">{{ new Date(treatment.startDate).toLocaleDateString() }}</td>
            <td class="has-text-centered">{{ new Date(treatment.endDate).toLocaleDateString() }}</td>
            <td class="has-text-centered">{{ treatment.route }}</td>
            <td class="has-text-centered">{{ treatment.dosage }}</td>
            <td class="has-text-centered">{{ treatment.prescribingPhysician }}</td>
            <td></td>
          </tr>
          </tbody>
        </table>
        <div class="has-text-centered"><button class="button is-danger has-text-centered" @click="openTreatmentForm(true)">Add Treatment?</button></div>
      </div>
    </div>

    <div class="columns has-background-warning">
      <div class="column has-text-centered">
        <p class="title has-text-centered">Appointments</p>
      </div>
    </div>

    <div class="columns has-background-warning-light info">
      <div class="column">
        <p class="title has-text-centered"></p>
        <table class="table is-fullwidth has-background-warning-light">
          <thead>
          <tr>
            <th></th>
            <th class="has-text-centered is-size-4">Notes</th>
            <th class="has-text-centered is-size-4">Date</th>
            <th class="has-text-centered is-size-4">Start Time</th>
            <th class="has-text-centered is-size-4">End Time</th>
            
          </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in appointments" :key="appointments._id">
              <td><button class="button is-danger">X</button></td>
              <td class="has-text-centered">{{ appointment.notes }}</td>
              <td class="has-text-centered">{{ appointment.date }}</td>
              <td class="has-text-centered">{{ appointment.startTime }}</td>
              <td class="has-text-centered">{{ appointment.endTime }}</td>
            </tr>
          </tbody>
        </table>
        <div class="has-text-centered"><button class="button is-warning" @click="sendToAppointmentPage()">Create Appointment?</button></div>
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
      treatments: [],
      appointments: [],
      windowOpen : false,
      newTreatment : {
        condition : '',
        name : '',
        dosage : '',
        frequency : '', 
        route : '',
        startDate : '',
        endDate : '',
        prescribingPhysician : '',
        notes: ''
      }
    };
  },
  methods: {
    async fetchPatient() {
      try {
        const response = await axios.get(`http://localhost:3000/patients/${this.$route.params.patient}`);
        this.patient = response.data;
        console.log(this.patient);
        await this.fillTreatments();
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
      }
    },
    async fetchAppointments(){
      try {
        const response = await axios.get(`http://localhost:3000/appointments`);
        console.log('response', response.data)
      

        this.appointments = response.data.filter(appointment => {
          console.log(appointment.patient)
          console.log(this.$route.params.patient)
          console.log(appointment.patient == this.$route.params.patient)
          return appointment.patient == this.$route.params.patient;
        })
        console.log('appointments', this.appointments)
      } catch (error) {
        console.error("Error getting data from getAppointments", error);
      }
    },
    openTreatmentForm(value) {
      this.$router
      this.clearTreatmentForm()
    },
    goBack() {
      this.$router.push('/patients');
    },
    sendToAppointmentPage() {
      this.$router.push({ name: 'Calender'})
    },
    async fillTreatments() {
      const tempTreatments = [];

      const allTreatments = this.patient.treatments.map(async (treatment) => {
        try {
          console.log(treatment)
          const response = await axios.get(`http://localhost:3000/treatments/${treatment}`)
          console.log(response)
          console.log(response.data);
          tempTreatments.push(response.data)
        } catch (error) {
          console.error(`Error fetching treatment ${treatment}`, error);
        }
      });
      await Promise.all(allTreatments)

      await console.log(tempTreatments)
      this.treatments = tempTreatments
    },
    async clearTreatment(treatment) {
      const deletedID = treatment._id
      console.log(deletedID)
      try {
        const response = await axios.delete(`http://localhost:3000/treatments/${deletedID}`)
      } catch (error) {
        console.log(error)
      }

      try {
        const response = await axios.get(`http://localhost:3000/patients/${this.$route.params.patient}`);
        const previousTreatments = response.data.treatments
        console.log(previousTreatments)
        const updatedTreatments = previousTreatments.filter(treatmentId => treatmentId !== deletedID) 
        console.log(updatedTreatments)
        const data = {
          treatments : updatedTreatments
        }
      
        await axios.put(`http://localhost:3000/patients/${this.$route.params.patient}`, data)
        this.openTreatmentForm(false);
        this.clearTreatmentForm
        console.log("Successfully Updated Patient")
      } catch (error) {
        console.log(error)
      }
      location.reload()
    }
  },
  created() {
    this.fetchPatient();
    this.fetchAppointments();
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
