<template>
    <!-- <section class="hero is-primary is-fullheight-with-navbar"> -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <section class="hero is-fullheight-with-navbar section has-background-info-light">
        <div v-if="!hasSearched" class="columns is-centered">
            <div class="column is-half mt-5">
                <h1 class="title">Patient Login</h1>
                <div class="box">
                    <div v-if="successMessage" class="notification is-success">
                        {{ successMessage }}
                    </div>
                    <div v-if="errorMessage === 'No result!'" class="notification is-danger">
                        Error occured with loggin in. Make sure you input the correct name and health card number.
                    </div>
                    <form @submit.prevent="submitForm">
                        <div class="columns">
                            <div class="column">
                                <div class="field">
                                    <label class="label">Patient First Name</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="patientFirstName">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Patient Last Name</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="lastName">
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <label class="label">Health Card</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="cardNumber">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-primary" type="submit">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

export default {
    components: { Multiselect },
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            patientFirstName: '',
            lastName: '',
            dateOfBirth: '',
            address: '',
            sex: '',
            cardNumber: '',
            patients: [],
            conditions: [],
            selectedConditions: [],
            filteredPatients: [],
            hasSearched: false,
            phoneNum: '',
            email: '',
            emergencyContactName: '',
            emergencyContactRelationship: '',
            emergencyContactPhone: '',
            successMessage: '',
            errorMessage: ''
        };
    },
    methods: {
        async fetchPatients() {
            try {
                const response = await axios.get(`https://emr-application.onrender.com/patients`);
                this.patients = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        submitForm() {
            this.filteredPatients = this.patients.filter(patient => {
                const firstNameMatch = patient.firstName.toLowerCase() === this.patientFirstName.toLowerCase();
                const lastNameMatch = patient.lastName.toLowerCase() === this.lastName.toLowerCase();
                const cardNumberMatch = patient.cardNumber.toLowerCase() === this.cardNumber.toLowerCase();
                return firstNameMatch && lastNameMatch && cardNumberMatch;
            });

            if (this.filteredPatients.length === 0) {
                this.errorMessage = "No result!";
                this.successMessage = "";
            } else {
                this.errorMessage = "";
                this.$router.push({ name: 'PatientProfile', params: { patient: this.filteredPatients[0]._id } });
            }
        },
    },
    created() {
        this.fetchPatients();
        let storedResults = localStorage.getItem('searchResults');
        let storedState = localStorage.getItem('searchState');
        if (storedResults && storedState) {
            this.filteredPatients = JSON.parse(storedResults);
            Object.assign(this, JSON.parse(storedState));
        }
    }
};
</script>

<style>
.container {
    overflow-x: hidden;
    overflow-y: hidden;
}
</style>
