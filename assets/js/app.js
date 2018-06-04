import Vue from 'vue';
import VueRouter from 'vue-router';
import { format } from 'date-fns';
import App from './App.vue';
import DBHelper from './dbhelper';
import Store from './store';
import router from './router';
import eventBus from './events';

// static assets
import '../manifest.webmanifest';
import './sw';

Vue.use(VueRouter);

// inject the db helper.
Vue.prototype.$db = DBHelper;

// use this as an event bus to trigger initMap in vue instances.

Vue.prototype.$bus = eventBus;

Vue.prototype.$store = Store;

Vue.prototype.$notify = notification => {
  eventBus.$emit('notification', notification);
};

// sync up the pending data.
eventBus.$on('online', () => {
  DBHelper.postPendingReviews();
  DBHelper.postPendingFavorites();
});

window.initMap = () => {
  eventBus.$emit('initMap');
};

window.addEventListener('online', () => {
  eventBus.$emit('online');
});

window.addEventListener('offline', () => {
  eventBus.$emit('offline');
});

navigator.serviceWorker.register('sw.js');

// define a getter for the online status of the user.
Object.defineProperty(Vue.prototype, '$isOnline', {
  get () {
    return navigator.onLine;
  }
});

Vue.filter('prettyDate', (value) => {
  if (!value) return value;

  return format(value, 'MMM DD, YYYY');
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
