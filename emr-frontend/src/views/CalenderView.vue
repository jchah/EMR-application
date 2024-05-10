<template>
  <div>
    <DatePicker v-model="date" />
    <p>Selected Date: {{ formatDate(date) }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

export default {
  components: {
    Calendar,
    DatePicker,
  },
  setup() {
    const date = ref(new Date());

    function formatDate(date) {
      // Format the date as needed
      return date.toLocaleDateString(); // Example formatting, adjust as needed
    }

    return { date, formatDate };
  },
};
</script>



