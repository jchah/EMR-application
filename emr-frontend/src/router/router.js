import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import Patients from '../views/Patients.vue';
// import Appointments from './views/Appointments.vue';
import Settings from '../views/Settings.vue';

const routes = [
    { path: '/', component: Dashboard },
    { path: '/patients', component: Patients },
    // { path: '/appointments', component: Appointments },
    { path: '/settings', component: Settings },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
