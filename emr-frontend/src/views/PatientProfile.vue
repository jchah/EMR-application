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