import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import DBHelper from './dbhelper';
import Store from './store';
import router from './router';

// static assets
import '../manifest.webmanifest';
import './sw';

Vue.use(VueRouter);

// inject the db helper.
Vue.prototype.$db = DBHelper;

// use this as an event bus to trigger initMap in vue instances.
const eventBus = new Vue();

Vue.prototype.$bus = eventBus;

Vue.prototype.$store = Store;

window.initMap = () => {
  eventBus.$emit('initMap');
};

navigator.serviceWorker.register('sw.js');

// define a getter for the online status of the user.
Object.defineProperty(Vue.prototype, '$isOnline', {
  get () {
    return navigator.onLine;
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
