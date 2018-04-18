import Vue from 'vue';

import RestaurantsPage from './pages/Restaurants';
import RestaurantInfoPage from './pages/RestaurantInfo';
import Breadcrumb from './components/Breadcrumb';
import DBHelper from './dbhelper';
import Store from './store';

import '../stylus/app.styl';

// static assets
import '../manifest.webmanifest';
import './sw';

// inject the db helper.
Vue.prototype.$db = DBHelper;

// use this as an event bus to trigger initMap in vue instances.
const eventBus = new Vue();

Vue.prototype.$bus = eventBus;

Vue.prototype.$store = Store;

window.initMap = () => {
  eventBus.$emit('initMap');
};

// define a getter for the online status of the user.
Object.defineProperty(Vue.prototype, '$isOnline', {
  get () {
    return navigator.onLine;
  }
});

new Vue({
  el: '#app',
  components: {
    Breadcrumb,
    RestaurantsPage,
    RestaurantInfoPage
  },
  created () {
    navigator.serviceWorker.register('sw.js');
  }
});
