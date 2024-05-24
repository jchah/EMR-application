import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import Patients from '../views/PatientsSearch.vue';
// import Appointments from './views/Appointments.vue';
import Settings from '../views/Settings.vue';
import Calendar from '../views/CalenderView.vue'
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
// import Documentation from '../views/DocumentationView.vue';
import Tests from '../views/TestDashboard.vue'

const routes = [
    { path: '/', component: Dashboard },
    { path: '/patients', component: Patients },
    { path: '/calendar', component: Calendar},
    { path: '/settings', component: Settings },
    { path: '/test-dashboard', component: Tests },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    // { path: '/documentation', component: Documentation },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
