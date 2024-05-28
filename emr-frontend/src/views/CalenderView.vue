<!-- IF YOU ARE ABOUT TO EDIT MY CODE TELL ME SO I CAN DO IT I NEED TO GET MARKS OFF THIS FUCKING PROJECT -->

<template>
  
  <Suspense>
    <div>
      <div class="section">
                  <div class="columns is-centered">
                    <div class="column">
                            <DatePicker v-model="date"  expanded/>
                            <table class="table">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Start Time</th>
                                  <th>End Time</th>
                                  <th>Notes</th>
                                </tr>
                              </thead>
                              <tbody>
                                  <tr v-for="app in appointments">
                                    <td>{{ app.patient }}</td>
                                    <td>{{ app.startTime }}</td>
                                    <td>{{ app.endTime }}</td>
                                    <td>{{ app.notes }}</td>
                                    <td> <button @click="deleteAppointment(app)" class="button is-danger"> Delete</button></td>
                                  </tr>
                              </tbody>
                            
                            </table>
                      </div>
                      <div class="column is-one-third">
                      <h1 class="title">Make an Appointment</h1>
                          <div class="box">
                              <form @submit.prevent="makeAppointment(date)">
                                  <div class="field">
                                    <label class="label">Selected Date: {{ formatDate(date) }}</label>
                                  </div>
                                 
                                  <label class="label">Patient Name</label>
                                  <div class="control">
                                      <input class="input" type="text" v-model="inSearchBar" required>
                                      <div class="control">
                                        <div class="dropdown is-active" v-if="showOptions()">
                                          <div class="dropdown-menu" style="position: absolute;">
                                            <div class="dropdown-content">
                                              <a v-for="option in searchOptions"  @click="selectOption(option)" class="dropdown-item">{{ option }}</a>
                                            </div>
                                          </div>
                                        </div>
                                  </div>
                                  </div>
                        
                          
                                  <div class="field">
                                  <div class="control beside">
                                    <label class="label">Start Time</label>
                                    <DatePicker mode="time" v-model="info.startTime"/>
                                    <label class="label">End Time</label>
                                    <DatePicker mode="time" v-model="info.endTime"/>
                                      
                                  </div>
                                 
                                  </div>
                          
                              
                          
                                  <div class="field">
                                  <label class="label">Notes</label>
                                  <div class="control">
                                      <input class="input" type="text" v-model="info.notes">
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
                  <div>

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
    
    let patientList = ref(null);
    let searchOptions = ref();
    let inSearchBar = ref();
    let isSelected = ref(false);
    //making appointment
    let info = ref({
      patientName: '',
      date:'',
      startTime: new Date(),
      endTime: new Date(),
      notes:'',
    })
    function showOptions(){
    
      try {
        if((inSearchBar.value.length<=0) || (isSelected.value))

          return false
        else  
          return true;
      
      } catch (error) {

        return false;
      }
      
    }
    //geting appointments
    let appointments = ref(null);
    watch(date, (newValue, oldValue) =>{
      getAppointments(date.value);
    })
    watch(inSearchBar, (newValue, oldValue) =>{
      inSearchBar.value = newValue
      try {
        if((inSearchBar.value === searchOptions.value[0]) === false)
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
       
        console.log(appointments.value)
        appointments.value = response.data;
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
        info.value.patientName = inSearchBar.value
        try {
          await axios.post(`${API_URL}/appointments`, {
            patient: info.value.patientName,
            date: info.value.date,
            startTime: info.value.startTime.toLocaleTimeString(),
            endTime: info.value.endTime.toLocaleTimeString(),
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

    async function getPatients(){
      try {
      
        let response = await axios.get(`${API_URL}/healthcards`)
        patientList.value = response.data;
        console.log(patientList.value)
        patientList.value = patientList.value.map((a) =>{
          return a.firstName + " " + a.lastName
        })
        
      } catch (error) {
        
      }
    }

    function filterSearch(){
      console.log("search bar value: " + inSearchBar.value)
      searchOptions.value = patientList.value.filter((a) => {

        return a.toLowerCase().includes(inSearchBar.value.toLowerCase())
      })
      console.log("search options: " + searchOptions.value)
    }

    function selectOption(option){
      inSearchBar.value=option
      isSelected.value = true;
      
    }



    return { 
      date,
      formatDate,
      info,
      getAppointments,
      makeAppointment,
      appointments,
      deleteAppointment,
      patientList,
      selectOption,
      inSearchBar,
      searchOptions,
      showOptions
     

    };
  },
};
</script>

<style>
.vc-time-header{
  display: none;
}

</style>


