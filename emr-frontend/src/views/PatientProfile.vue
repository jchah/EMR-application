<template>
    

      <section class="hero is-link">
        <div class="hero-body">
          <p class="title">Ethan McMullen - Patient Profile</p>
        </div>
      </section>
      
      <div class="columns has-background-link-light info">
        <div class="column ">
          <p class="title has-text-centered">Patient Info</p>
            <div class="columns">
              <div class="column">
                <p class="subtitle">First Name : {Name}</p>
                <p class="subtitle">Last Name : {DOB}</p>
              </div>
              <div class="column">
                <p class="subtitle">Sex : {Sex}</p>
                <p class="subtitle">Health Card Number : {Card Number}</p>
              </div>
              <div class="column ">
                <p class="subtitle">DOB : {2001-09-11}</p>
                <p class="subtitle">Address : {123 street rd}</p>
              </div>
              <div class="column ">
                <p class="subtitle">Phone : {###-###-####}</p>
                <p class="subtitle">Email : {Example@example.com}</p>
              </div>
            </div>
        </div>
      </div>
      <div class="columns has-background-warning-light info">
          <div class="column">
            <p class="title has-text-centered">Appointments</p>
          </div>
          <div class="column is-one-quarter">
            <p class="title has-text-centered">Book Apointment For Patient?</p>

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
        </div>
      
  </template>
     
    
    <script>
    import axios from "axios";
    
    export default {
      data() {
        return {
          cardNumberFromParam : '' 
        };
      },
      methods: {
             
      },
      created() {
          console.log(this.$route.params.cardNum)
          this.cardNumberFromParam = this.$route.params.cardNum;
      }
    };
    </script>
    
    <style scoped>
    .padding {
      padding: 40px;
      color: white;
      font-size: 50px
    }
    
    .columns {
      padding: 20px;
    }

    .info {
      padding-bottom: 50px;
      padding-top: 50px;
    }
    </style>