import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import SearchPatient from '../views/SearchPatient.vue';
import Patients from '../views/PatientsSearch.vue';
import PatientProfile from '../views/PatientProfile.vue'
import AddTreatment from '../views/AddTreatmentView.vue'
import Settings from '../views/Settings.vue';
import Calendar from '../views/CalenderView.vue'
import Login from '../views/LoginView.vue';
import Register from '../views/DoctorRegisterView.vue';
import Tests from '../views/Dashboard.vue'
import User from '../views/UserView.vue'

const routes = [
    { path: '/', component: Dashboard },
    { path: '/search-patient', component: SearchPatient },
    { path: '/patients', component: Patients },
    { path: '/calendar', component: Calendar, name: 'Calendar' },
    { path: '/settings', component: Settings },
    { path: '/test-dashboard', component: Tests },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/patients/:patient', name : 'PatientProfile', component: PatientProfile},
    { path: '/patients/add-treatment/:patient', name: 'AddTreatment', component: AddTreatment },
    { path: '/user', component: User }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;