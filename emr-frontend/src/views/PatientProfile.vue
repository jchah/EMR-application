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
                <p class="subtitle">First Name : {{ selectedCard.firstName}}</p>
                <p class="subtitle">Last Name : {{ selectedCard.lastName}}</p>
              </div>
              <div class="column">
                <p class="subtitle">Sex : {{ selectedCard.sex}}</p>
                <p class="subtitle">Health Card Number : {{ selectedCard.cardNumber}}</p>
              </div>
              <div class="column ">
                <p class="subtitle">DOB : {{ selectedCard.dateOfBirth}}</p>
                <p class="subtitle">Address : {{ selectedCard.address}}</p>
              </div>
              <div class="column ">
                <p class="subtitle">Phone : {{ selectedCard.contact.phone}}</p>
                <p class="subtitle">Email : {{ selectedCard.contact.phone}}</p>
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
          cardNumberFromParam : '',
          healthCards: [],
          selectedCard: null
        };
      },
      methods: {
      async fetchHealthCards() {
          try {
          const response = await axios.get(`http://localhost:3000/healthcards`, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          this.healthCards = response.data
          console.log(this.healthCards)
        } catch (error) {
          console.log(error)
        }

        this.healthCards.forEach(card => {
          console.log(card.cardNumber)
          console.log(this.cardNumberFromParam)
          if(card.cardNumber == this.cardNumberFromParam) {
            this.selectedCard = card
            console.log(this.selectedCard)
            return
          }          
        })
      }    
      },
      created() {
          console.log(this.$route.params.cardNum)
          this.cardNumberFromParam = this.$route.params.cardNum;
          this.fetchHealthCards()

      
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