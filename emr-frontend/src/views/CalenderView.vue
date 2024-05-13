<template>
  <Suspense>
    <div>
      <DatePicker v-model="date" />
      <p>Selected Date: {{ formatDate(date) }}</p>
      <button @click="getAppointments(date)">Get Appointments?</button>
      <ul v-if="isClicked">
        <li></li>
      </ul>
    </div>
  </Suspense>
  
</template>

<script>
import { ref } from 'vue';
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import axios from 'axios';

const API_URL = "http://localhost:3000";
export default {
  components: {
    Calendar,
    DatePicker,
  },
  setup() {
    const date = ref(new Date());
    //making appointment
    let info = ref({
      patientName: '',
      date:'',
      time:'',
      notes:'',
    })

    //geting appointments
    let appointments = ref();
    let isClicked = ref();

    async function getAppointments(date){
      isClicked.value = true;
      try {
        const response = await axios.get(`${API_URL}/calendar/appointments`);
        appointments.value = response.data;
        console.log("hello")
      } catch (error) {
        console.error("Error getting data from getAppointments", error);
      }
      
    }

    function formatDate(date) {
      isClicked.value = false;
      return date.toLocaleDateString(); 
    }



    return { 
      date, 
      formatDate,
      info,
      getAppointments,
      isClicked

    };
  },
};
</script>



