import Vue from 'vue';
import VueConfirmDialog from 'vue-confirm-dialog';
import titleMixin from '@/styles/titleMixin';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

Vue.mixin(titleMixin);

Vue.config.productionTip = false;
Vue.use(VueConfirmDialog);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);

new Vue({
  router,
  store,
  VueConfirmDialog,
  render: (h) => h(App),
}).$mount('#app');
