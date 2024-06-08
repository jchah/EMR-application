<template>
  <section class="hero is-link">
    <div class="hero-body is-flex is-justify-content-space-between is-align-items-center">
      <p class="title" v-if="patient">Patient Profile : {{patient.firstName + " " + patient.lastName}}</p>
      

      <button v-if="token" class="button is-info" @click="goBack">Back to Patients</button>
      
    </div>
  </section>

  <div class="columns has-background-info-light">
      <div class="column has-text-centered">
        <p class="title has-text-centered">Patient Info</p>
      </div>
    </div>

  <div v-if="patient">
    <div class="columns has-background-info-light has-text-centered info">
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

    <div class="columns has-text-centered has-background-info-light">
      <div class="column">
        <button class="button is-info is-size-4" @click="openContactOverlay(true)">Change Contact Preference?</button>
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
        <div v-if="token" class="has-text-centered"><button class="button is-danger has-text-centered" @click="openTreatmentForm(true)">Add Treatment?</button></div>
      </div>
    </div>

    <div class="columns has-background-warning-light">
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
              <td><button class="button is-danger" @click="deleteAppointment(appointment._id)">X</button></td>
              <td class="has-text-centered">{{ appointment.notes }}</td>
              <td class="has-text-centered">{{ appointment.date }}</td>
              <td class="has-text-centered">{{ appointment.startTime }}</td>
              <td class="has-text-centered">{{ appointment.endTime }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="token" class="has-text-centered"><button class="button is-warning" @click="sendToAppointmentPage()">Create Appointment?</button></div>
      </div>
      
    </div>
    
    <div class="overlay" v-if="contactOpen">
      <div class="box">
        <form @submit.prevent="addTreatment()">
          <div class="has-text-centered">
            <p class="title">Current Preference : {{ patient.contactPreference }}</p>
            <p class="title">___________________________</p>
            <br>
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

    <div class="overlay" v-if="windowOpen">
            <div class="box">
              <form @submit.prevent="addTreatment()">
                <br>
                <p class="title has-text-centered">Add New Treatment</p>
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Condition Name</label>
                        <div class="control">
                          <input class="input" type="text" v-model="newTreatment.condition">
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Treatment Name</label>
                        <div class="control">
                          <input class="input" type="text" v-model="newTreatment.name">
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Dosage</label>
                        <div class="control">
                          <input class="input" type="text" v-model="newTreatment.dosage">
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Frequency</label>
                        <div class="control">
                          <input class="input" type="text" v-model="newTreatment.frequency">
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Route</label>
                        <div class="control">
                          <input class="input" type="text" v-model="newTreatment.route">
                        </div>
                      </div>
                    </div>

                  <div class="column">
                  <div class="field">
                    <label class="label">Start Date</label>
                    <div class="control">
                      <input class="input" type="date" v-model="newTreatment.startDate">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">End Date</label>
                    <div class="control">
                      <input class="input" type="date" v-model="newTreatment.endDate">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Prescribing Physician</label>
                    <div class="control">
                      <input class="input" type="text" v-model="newTreatment.prescribingPhysician">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Notes</label>
                    <div class="control">
                      <input class="input" type="text" v-model="newTreatment.notes">
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
                    <button class="button is-info" @click="clearTreatmentForm()"> Clear Form</button>
                  </div>
                  <div class="column">
                    <button class="button is-danger" @click="openTreatmentForm(false)"> Cancel</button>
                  </div>
                </div>
              </form>
              <br>
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
      contactOpen : false,
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
        console.log('patient', this.patient);
        console.log('preference', this.patient.patientPreference)
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
      this.windowOpen = value
      this.clearTreatmentForm()
    },
    openContactOverlay(value) {
      this.contactOpen = value
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
      this.$router.push('/patients');
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
          const response = await axios.post(`http://localhost:3000/treatments`, this.newTreatment);
          this.successMessage = 'New treatment added successfully.';
          let treatmentID = response.data._id;
          console.log("Treatment ID:")
          console.log(treatmentID);
          try {
            const response = await axios.get(`http://localhost:3000/patients/${this.$route.params.patient}`);
            const treatments = response.data.treatments;

            console.log("Before:")
            console.log(treatments);
            treatments.push(treatmentID);
            console.log("After:")
            console.log(treatments)

            const data = {
              treatments: treatments
            };

            await axios.put(`http://localhost:3000/patients/${this.$route.params.patient}`, data)
            this.openTreatmentForm(false);
            this.clearTreatmentForm();
            console.log("Successfully updated treatments");
            this.successMessage = 'Successfully updated treatments';
            location.reload()
            
          } catch (e) {
            console.log("Error updating treatment: " + e);
          }
         
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
    async selectPreference(value) {
      this.contactOpen = false
      const data = {
        contactPreference : value
      }
      try {
        const response = await axios.put(`http://localhost:3000/patients/${this.$route.params.patient}`, data)
        console.log(response.data)
        location.reload()
      } catch (error) {
        console.log(error)
      }
    },
    async deleteAppointment(treatmentID) {
      console.log(treatmentID)
      try {
        const response = await axios.delete(`http://localhost:3000/appointments/${treatmentID}`)
      } catch (error) {
        console.log(error)
      }
      location.reload()
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
