<template>
<div id="test-dashboard" class="has-background-white-ter">
    <div class="section" id="test-forms">
        <h1 class="title">Test Dashboard</h1>
        <div class="columns is-centered">
            <div class="section column is-half has-background-white" id="order">
                <h2 class="section-header">Order test</h2>
                <form @submit.prevent="">
                    <div class="field" id="order-patient">
                        <label for="order-patient-select" class="label">Patient</label>
                        <div class="control">
                            <div class="select">
                                <select name="patient" id="order-patient-select">
                                    <option v-for="patient in patients">{{ patient.healthCard.firstName }} {{ patient.healthCard.lastName }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field" id="test-type">
                        <label for="test-type-select" class="label">Test Ordered</label>
                        <div class="control">
                            <div class="select">
                                <select name="test" id="test-type-select">
                                    <option v-for="test in tests">{{ test.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field" id="stat">
                        <label for="stat-q" class="label">STAT?</label>
                        <div class="control">
                            <input class="checkbox" type="checkbox" name="stat-q" id="stat-q">
                        </div>
                    </div>
                </form>
            </div>
            <hr>
            <div class="section column is-half has-background-white" id="results">
                <h2 class="section-header">Submit test results</h2>
                <form @submit.prevent="">
                    <div class="field" id="order-select">
                        <label for="test-order-select" class="label">Order</label>
                        <div class="control">
                            <div class="select">
                                <select name="" id="test-order-select" v-model="this.resultsData.order">
                                    <option v-for="order in orders">{{ test.test }} - {{ test.patient }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field" id="date">
                        <label for="test-date" class="label">Date of Test</label>
                        <div class="control">
                            <input class="input" type="date" name="test-date" id="test-date" v-model="this.resultsData.date">
                        </div>
                    </div>
                    <div class="field" id="results">
                        <label for="results-box" class="label">Results</label>
                        <i>If you are inputting lab values, separate each value with a semi-colon.</i>
                        <div class="control">
                            <textarea class="input" style="resize: vertical" v-model="this.resultsData.results"></textarea>
                        </div>
                    </div>
                    <div class="field" id="results">
                        <label for="results-box" class="label">Comments</label>
                        <div class="control">
                            <textarea class="input" style="resize: vertical" v-model="this.resultsData.comments"></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
    setup() {
        const patients = ref(null);
        const tests = ref(null);
        const orders = ref(null);
        onMounted(() => {
            axios.get('http://localhost:3000/patients', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                patients.value = response.data;
            })
            .catch((error) => {
                console.log(error);
            }),
            axios.get('http://localhost:3000/tests', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                tests.value = response.data;
            })
            .catch((error) => {
                console.log(error);
            }),
            axios.get('http://localhost:3000/test-orders', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                orders.value = response.data;
            })
            .catch((error) => {
                console.log(error);
            })
        })
        return { patients, tests, orders }
    },

    data() {
        return {
            orderData: {
                test: '',
                patient: '',
                date: new Date()
            },
            resultsData: {
                order: '',
                date: new Date(),
                results: '',
                comments: ''
            }
        }
    }
}
</script>

<style>
.column {
    margin: 1%;
    text-align: left;
}

#test-forms {
    text-align: center;
    .section-header {
        text-align: center;
    }
}
</style>