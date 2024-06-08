<template>
    <section class="hero is-fullheight-with-navbar has-background-info-light">

      <div class="section">
        <h1 class="title">Appointments</h1>
        <div class="is-centered">
          <div class="">
            <DatePicker class="" v-model="date" expanded/>
            <button style="margin-top: 20px; margin-bottom: 20px" class="button is-primary is-centered" @click="isDoingForm(true)">Make Appointment</button>
            </div>
            <div class="box">
            <table class="table" v-if="!appointments || appointments.length > 0">
              <thead>
              <tr>
                <th>Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Notes</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="app in appointments" :key="app.id">
                <td><router-link :to="`/patients/${app.patient.data._id}`">{{ app.patient.data.firstName + " " +
                 app.patient.data.lastName}}</router-link></td>
                <td>{{ app.startTime }}</td>
                <td>{{ app.endTime }}</td>
                <td>{{ app.notes }}</td>
                <td class="has-text-white has-text-centered">
                  <button @click="deleteAppointment(app)" class="button is-danger"> Delete</button>

                </td>
              </tr>
              </tbody>
            </table>
            <div v-else>
              <p>No appointments scheduled for the selected date.</p>
            </div>
          </div>
          
          <div class="overlay" v-if="isOn">
            <div class="box">
              <form @submit.prevent="makeAppointment(date)">
                <div class="field has-text-centered">
                  <label class="title has-text-dark">Selected Date: {{ formatDate(date) }}</label>
                </div>
                <label class="label">Patient Name</label>
                <div class="control">
                  <input class="input" type="text" v-model="inSearchBar" required>
                  <div class="dropdown is-active is-bottom" v-if="showOptions()" style="display: flex;">
                    <div class="dropdown-menu" style="">
                      <div class="dropdown-content">
                        <a v-for="option in searchOptions" @click="selectOption(option)" class="dropdown-item">{{ option }}</a>
                      </div>
                    </div>
                  </div>
                </div>
                <br>
                <div class="columns has-text-centered">
                      <div class="column">
                        <div class="field">
                          <label class="label ">Start Time</label>
                          <DatePicker mode="time" v-model="info.startTime"/>
                        </div>
                      </div>
                      

                      <div class="column">
                        <div class="field">
                          <label class="label">End Time</label>
                          <DatePicker mode="time" v-model="info.endTime"/>
                        </div>
                      </div>
                  </div>  
                <div class="field">
                  <label class="label">Notes</label>
                  <div class="control">
                    <input class="input" type="text" v-model="info.notes">
                  </div>
                </div>

                <div class="columns has-text-centered">
                  <div class="column">
                    <div class="field">
                      <div class="control">
                        <button class="button is-primary is-fullwidth" type="submit">Submit</button>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <button class="button is-danger is-fullwidth" @click="isDoingForm(false)"> Cancel</button>
                  </div>
                </div>





                <
                <div v-if="hasErrorMessage" class="notification is-danger">Please Enter Valid Patient Name</div>
              </form>
              <br>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import axios from 'axios';

import emailjs, { send } from 'emailjs-com'

emailjs.init('2aRoZGFYWXbozLSuh');

const API_URL = "http://localhost:3000";

export default {
  components: {
    DatePicker,
  },
  setup() {
    let isOn = ref(false)
    const date = ref(new Date());

    let patientList = ref(null);
    let searchOptions = ref();
    let inSearchBar = ref();
    let isSelected = ref(false);
    let hasErrorMessage = ref(false)
    // making appointment
    let info = ref({
      patientName: '',
      date:'',
      startTime: new Date(),
      endTime: new Date(),
      notes:'',
    })

    let token = localStorage.getItem('token') || null

    if(!token) {
      window.location = ('/')
    }

    function showOptions(){

      try {
        return !((inSearchBar.value.length <= 0) || (isSelected.value));

      } catch (error) {

        return false;
      }

    }
    // getting appointments
    let appointments = ref(null);
    watch(date, () =>{
      getAppointments(date.value);
    })
    watch(inSearchBar, (newValue) =>{
      inSearchBar.value = newValue
      try {
        console.log(inSearchBar.value)
        console.log(searchOptions.value[0])
        if(!(inSearchBar.value === searchOptions.value[0]))
            isSelected.value = false
      } catch (error) {
        isSelected.value = false
      }

      filterSearch();
    })

    onMounted(() => {

      getPatients();
      getAppointments(date.value);
    });

    async function getAppointments(date){


      try {
        console.log(date.toLocaleDateString())
        const response = await axios.get(`${API_URL}/calendar/appointments`, {
          params:{
            date: date.toLocaleDateString()
          }

        });

        
        appointments.value = response.data;
        appointments.value.forEach(async (a) =>{
          let id = a.patient
          a.patient = await axios.get(`${API_URL}/patients/${id}`)
        })
        console.log(appointments.value)
        sortTimeEariliest();



      } catch (error) {
        console.error("Error getting data from getAppointments", error);
      }

    }

    function sortTimeEariliest(){
      appointments.value = appointments.value.sort((a, b) =>{
        const d1 = new Date(`2000-01-01 ${a.startTime}`);
        const d2 = new Date(`2000-01-01 ${b.startTime}`);
        if(d1<d2)
          return -1;
        else if(d1>d2)
          return 1;
        else
          return 0;
      })

    }

    async function makeAppointment(date){
        info.value.date = date.toLocaleDateString();
        if(findName(inSearchBar.value)){
          hasErrorMessage.value = false;
          info.value.patientName = inSearchBar.value;
          try {
          await axios.post(`${API_URL}/appointments`, {
            patientDeats: info.value.patientName,
            date: info.value.date,
            startTime: info.value.startTime.toLocaleTimeString(),
            endTime: info.value.endTime.toLocaleTimeString(),
            notes: info.value.notes,
          })

          checkPreference()
          
          } catch (error) {
            console.error(error)
          }
        }else{
          hasErrorMessage.value = true;
          return ""
        }
          
       
    }

    async function checkPreference() {
      const pid = patientList.value.filter((a) => {
          console.log('paitents name is ' + a.name, "appointment patients name is " + inSearchBar.value)
          console.log(inSearchBar.value.toLowerCase().includes(a.name.toLowerCase()))
          if(inSearchBar.value.toLowerCase().includes(a.name.toLowerCase()))
            return a.name
      })[0].patientID

      const request = await axios.get(`${API_URL}/patients/${pid}`)

      send([ request.data.contactPreference, request ])
    }

    async function send(arr) {
      if(arr[0] == 'sms') {
        await axios.post(`${API_URL}/send-sms`, {
          to: arr[1].data.contact.phone,
          message: `Your appointment is scheduled for ${info.value.date} and ${info.value.startTime.toLocaleTimeString()}.`
        })
      } else if (arr[0] == 'email') {
        await axios.post(`${API_URL}/send-email`, {
          to: arr[1].data.contact.email,
          subject: 'Appointment Confirmation',
          text: `Your appointment is scheduled for ${info.value.date} and ${info.value.startTime.toLocaleTimeString()}.\n 
          If this was not you, please log into the EMR application and delete this appointment immediately. \n\nRegards, \nEMR Team`
        })
      }

      location.reload()
    }

    async function deleteAppointment(date){
      try {
        console.log(date._id)
        await axios.delete(`${API_URL}/appointments/${date._id}`)
        location.reload();
      } catch (error) {

      }
    }

    function findName(a){
      let foundName = false;
      patientList.value.forEach((b)=>{
        if((b.name) === a.substring(0, a.indexOf(","))){
          foundName = true
        }
      })
      return foundName;
    }

    function formatDate(date) {
      return date.toLocaleDateString();
    }

    async function getPatients(){
      try {

        let response = await axios.get(`${API_URL}/patients`)
        patientList.value = response.data;
        console.log(patientList.value)
        patientList.value = patientList.value.map((a) =>{
          return {name:a.firstName + " " + a.lastName, patientID: a._id, cardNumber: a.cardNumber}
        })
        console.log(patientList.value)

      } catch (error) {

      }
    }

    function filterSearch(){
      console.log("search bar value: " + inSearchBar.value)
      console.log(patientList.value)
      searchOptions.value = patientList.value.filter((a) => {
        console.log(a.name)
        if(a.name.toLowerCase().includes(inSearchBar.value.toLowerCase()))
          return a.name
      }).map((a) => a.name + ", Card Number: " + a.cardNumber)
      
    }

    function selectOption(option){
      inSearchBar.value=option
      isSelected.value = true;

    }




    function isDoingForm(a){
      isOn.value = a;
    }

    function hasAppointments() {
      console.log('has appointments: ' + appointments.value.length)
      return appointments.value.length > 0
    }

    async function sendEmail(patientEmail, subject, message) {
      const templateParams = {
          to_email: patientEmail,
          subject: subject,
          message: message,
      };

      emailjs.send('emr-reminders', 'reminder-template', templateParams)
          .then(response => {
              console.log('Email sent successfully!', response.status, response.text);
          })
          .catch(error => {
              console.error('Failed to send email.', error);
          });

      location.reload();
    }

    return {
      date,
      formatDate,
      info,
      makeAppointment,
      appointments,
      deleteAppointment,
      patientList,
      selectOption,
      inSearchBar,
      searchOptions,
      showOptions,
      isOn,
      isDoingForm,
      hasErrorMessage,
      sendEmail,
      hasAppointments

    };
  },
};
</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
  z-index: 9999; /* Make sure it appears on top of everything */
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeInAnimation ease 0.4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.overlay .box {
  background-color: white;
  width: 500px;
  padding: 20px;
  border-radius: 5px;
  animation: fadeInAnimation ease 0.4s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}

@keyframes fadeInAnimation {
    0% {
        opacity: 0.4;
    }
    100% {
        opacity: 1;
    }
}

.dropdown{
  display: flex;
}

</style>