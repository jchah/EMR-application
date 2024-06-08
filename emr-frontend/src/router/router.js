import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import Patients from '../views/PatientsSearch.vue';
import PatientProfile from '../views/PatientProfile.vue'
// import Appointments from './views/Appointments.vue';
import Settings from '../views/Settings.vue';
import Calendar from '../views/CalenderView.vue'
import Login from '../views/DoctorLoginView.vue';
import Register from '../views/DoctorRegisterView.vue';
// import Documentation from '../views/DocumentationView.vue';
import Tests from '../views/TestDashboard.vue'
import User from '../views/UserView.vue'

const routes = [
    { path: '/', component: Dashboard },
    { path: '/patients', component: Patients },
    { path: '/calendar', component: Calendar, name : 'Calender'},
    { path: '/settings', component: Settings },
    { path: '/test-dashboard', component: Tests },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/patients/:patient', name : 'PatientProfile', component: PatientProfile},
    { path: '/user', component: User }
    // { path: '/documentation', component: Documentation },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
