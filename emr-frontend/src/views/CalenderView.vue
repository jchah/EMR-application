<!-- IF YOU ARE ABOUT TO EDIT MY CODE TELL ME SO I CAN DO IT I NEED TO GET MARKS OFF THIS FUCKING PROJECT -->

<template>
  
  <Suspense>
    <div>
      <div class="section">
                  <div class="columns is-centered">
                    <div class="column">
                            <DatePicker v-model="date" mode="date" expanded/>
                            
                            <ul>
                              <li v-for="app in appointments"> {{ app.patient }}: {{ app.startTime }} - {{ app.endTime }} ({{ app.notes }}) 
                                <button @click="deleteAppointment(app)" class=""> Delete</button></li>
                            </ul>
                      </div>
                      <div class="column is-one-third">
                      <h1 class="title">Make an Appointment</h1>
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
  </Suspense>
  
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import axios from 'axios';

const API_URL = "http://localhost:3000";
export default {
  components: { 
    DatePicker,
  },
  setup() {
    const date = ref(new Date());
    
    //making appointment
    let info = ref({
      patientName: '',
      date:'',
      startTime:'',
      endTime:'',
      notes:'',
    })

    //geting appointments
    let appointments = ref();
    watch(date, (newValue, oldValue) =>{
      getAppointments(date.value);
    })

    onMounted(() => {
      
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
       
        console.log(appointments.value)
        return appointments.value = response.data;
        
      } catch (error) {
        console.error("Error getting data from getAppointments", error);
      }
      
    }

    async function makeAppointment(date){
        info.value.date = date.toLocaleDateString();
        try {
          await axios.post(`${API_URL}/appointments`, {
            patient: info.value.patientName,
            date: info.value.date,
            startTime: info.value.startTime,
            endTime: info.value.endTime,
            notes: info.value.notes
          })
          location.reload()
        } catch (error) {
          
        }
    }

    async function deleteAppointment(date){
      try {
        console.log(date._id)
        await axios.delete(`${API_URL}/appointments/${date._id}`)
        location.reload();
      } catch (error) {
        
      }
    }

    function formatDate(date) {
      return date.toLocaleDateString(); 
    }



    return { 
      date, 
      formatDate,
      info,
      getAppointments,
      makeAppointment,
      appointments,
      deleteAppointment

    };
  },
};
</script>

<style scoped>
/* Scoped styles for this component */

/* Example of targeting v-calendar */


</style>


