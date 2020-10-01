import Vue from 'vue';
import VueRouter from 'vue-router';
import Contacts from '../views/Contacts.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Contacts Book',
    component: Contacts,
  },
  {
    path: '/contact/:id',
    name: 'Details',
    component: () => import(/* webpackChunkName: "contactDetails" */ '../views/ContactDetails.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
