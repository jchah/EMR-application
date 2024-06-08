<template>
  <section class="hero is-link">
    <div class="hero-body is-flex is-justify-content-space-between is-align-items-center">
      <p class="title" v-if="patient">Patient Profile : {{ patient.firstName + " " + patient.lastName }}</p>
      <button v-if="token" class="button is-info" @click="goBack">Back to Patients</button>
    </div>
  </section>

  <div v-if="patient">
    <div class="card my-4">
      <div class="card-content">
        <div class="columns is-mobile">
          <div class="column has-text-centered">
            <p class="title has-text-centered">Patient Info</p>
          </div>
        </div>
        <div class="columns has-text-centered info">
          <div class="column">
            <div class="columns">
              <div class="column">
                <p class="subtitle">First Name : {{ patient.firstName }}</p>
                <p class="subtitle">Last Name : {{ patient.lastName }}</p>
              </div>
              <div class="column">
                <p class="subtitle">Sex : {{ patient.sex }}</p>
                <p class="subtitle">Health Card Number : {{ patient.cardNumber }}</p>
              </div>
              <div class="column">
                <p class="subtitle">DOB : {{ patient.dateOfBirth }}</p>
                <p class="subtitle">Address : {{ patient.address }}</p>
              </div>
              <div class="column">
                <p class="subtitle">Phone : {{ patient.contact.phone }}</p>
                <p class="subtitle">Email : {{ patient.contact.email }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="columns has-text-centered">
          <div class="column">
            <button class="button is-info is-size-5 mt-3" @click="openContactOverlay(true)">Change Contact Preference?</button>
          </div>
        </div>
      </div>
    </div>

    <div class="columns has-background-danger-light">
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
            <tr v-for="treatment in patient.treatments" :key="treatment._id">
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
        <div v-if="token" class="has-text-centered">
          <button class="button is-danger has-text-centered" @click="openTreatmentForm(true)">Add Treatment?</button>
        </div>
      </div>
    </div>

    <div class="card my-4">
      <div class="card-content">
        <div class="columns is-mobile">
          <div class="column has-text-centered">
            <p class="title has-text-centered">Appointments</p>
          </div>
        </div>
        <div class="columns info">
          <div class="column">
            <p class="title has-text-centered"></p>
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th></th>
                  <th class="has-text-centered is-size-5">Notes</th>
                  <th class="has-text-centered is-size-5">Date</th>
                  <th class="has-text-centered is-size-5">Start Time</th>
                  <th class="has-text-centered is-size-5">End Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="appointment in appointments" :key="appointment._id">
                  <td><button class="button is-danger is-small" @click="deleteAppointment(appointment._id)">X</button></td>
                  <td class="has-text-centered">{{ appointment.notes }}</td>
                  <td class="has-text-centered">{{ appointment.date }}</td>
                  <td class="has-text-centered">{{ appointment.startTime }}</td>
                  <td class="has-text-centered">{{ appointment.endTime }}</td>
                </tr>
              </tbody>
            </table>
            <div class="has-text-centered">
              <button v-if="token" class="button is-warning is-size-5 mt-3" @click="sendToAppointmentPage()">Create Appointment?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="overlay" v-if="contactOpen">
      <div class="box">
        <form>
          <div class="has-text-centered">
            <p class="title">Current Preference : {{ patient.contactPreference }}</p>
            <p class="title">___________________________</p>
            <br />
            <p class="title">Select New Preference:</p>
          </div>
          <div class="columns has-text-centered">
            <div class="column">
              <button class="button is-info is-size-3" @click="selectPreference('email')">Email</button>
            </div>
            <div class="column">
              <button class="button is-info is-size-3" @click="selectPreference('sms')">SMS</button>
            </div>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PatientProfile",
  data() {
    return {
      patient: null,
      treatments: [],
      appointments: [],
      windowOpen: false,
      contactOpen: false,
      token: null,
      newTreatment: {
        condition: "",
        name: "",
        dosage: "",
        frequency: "",
        route: "",
        startDate: "",
        endDate: "",
        prescribingPhysician: "",
        notes: "",
      },
    };
  },
  methods: {
    async fetchPatient() {
      try {
        const response = await axios.get(`http://localhost:3000/patients/${this.$route.params.patient}`);
        this.patient = response.data;
        console.log("patient", this.patient);
        await this.fillTreatments();
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
      }
    },
    async fetchAppointments() {
      try {
        const response = await axios.get(`http://localhost:3000/appointments`);
        this.appointments = response.data.filter((appointment) => appointment.patient == this.$route.params.patient);
        console.log("appointments", this.appointments);
      } catch (error) {
        console.error("Error getting data from getAppointments", error);
      }
    },
    openTreatmentForm(value) {
      this.$router.push(`/patients/add-treatment/${this.$route.params.patient}`);
    },
    openContactOverlay(value) {
      this.contactOpen = value;
    },
    clearTreatmentForm() {
      this.newTreatment = {
        condition: "",
        name: "",
        dosage: "",
        frequency: "",
        route: "",
        startDate: "",
        endDate: "",
        prescribingPhysician: "",
        notes: "",
      };
    },
    goBack() {
      this.$router.push("/patients");
    },
    async addTreatment() {
      console.log(this.newTreatment);
      if (this.newTreatment.condition !== "" && this.newTreatment.prescribingPhysician !== "") {
        if (this.newTreatment.name === "") {
          this.newTreatment.name = "None";
          this.newTreatment.dosage = "N/A";
          this.newTreatment.frequency = "N/A";
          this.newTreatment.route = "N/A";
          this.newTreatment.startDate = "N/A";
          this.newTreatment.endDate = "N/A";
        }
        try {
          const response = await axios.post(`http://localhost:3000/treatments`, this.newTreatment);
          const treatmentID = response.data._id;
          const patientResponse = await axios.get(`http://localhost:3000/patients/${this.$route.params.patient}`);
          const treatments = patientResponse.data.treatments;
          treatments.push(treatmentID);

          await axios.put(`http://localhost:3000/patients/${this.$route.params.patient}`, { treatments });
          this.openTreatmentForm(false);
          this.clearTreatmentForm();
          console.log("Successfully updated treatments");
          location.reload();
        } catch (error) {
          console.error("Failed to add new treatment:", error);
        }
      } else {
        console.error("Please ensure you fill out all fields.");
      }
    },
    sendToAppointmentPage() {
      this.$router.push({ name: "Calendar" });
    },
    async fillTreatments() {
      const tempTreatments = [];
      const allTreatments = this.patient.treatments.map(async (treatment) => {
        try {
          const response = await axios.get(`${treatment}`);
          tempTreatments.push(response.data);
        } catch (error) {
          console.error(`Error fetching treatment ${treatment}`, error);
        }
      });
      await Promise.all(allTreatments);
      this.treatments = tempTreatments;
    },
    async selectPreference(value) {
      this.contactOpen = false;
      try {
        await axios.put(`http://localhost:3000/patients/${this.$route.params.patient}`, { contactPreference: value });
        location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteAppointment(appointmentID) {
      try {
        await axios.delete(`http://localhost:3000/appointments/${appointmentID}`);
        location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    async clearTreatment(treatment) {
      const deletedID = treatment._id;
      try {
        await axios.delete(`http://localhost:3000/treatments/${deletedID}`);
        const patientResponse = await axios.get(`http://localhost:3000/patients/${this.$route.params.patient}`);
        const updatedTreatments = patientResponse.data.treatments.filter((treatmentId) => treatmentId !== deletedID);
        await axios.put(`http://localhost:3000/patients/${this.$route.params.patient}`, { treatments: updatedTreatments });
        this.openTreatmentForm(false);
        this.clearTreatmentForm();
        console.log("Successfully updated patient");
        location.reload();
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.token = localStorage.getItem("token");
    this.fetchPatient();
    this.fetchAppointments();
  },
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

.card {
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  border-radius: 6px;
}

.card-content {
  padding: 1.5rem 2rem;
}
</style>
