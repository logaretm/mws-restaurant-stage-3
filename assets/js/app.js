import Vue from 'vue';

import RestaurantsPage from './pages/Restaurants';
import RestaurantInfoPage from './pages/RestaurantInfo';
import Breadcrumb from './components/Breadcrumb';

import '../stylus/app.styl';
import DBHelper from './dbhelper';

// static assets
import '../manifest.webmanifest';
import '../sw.js';

// inject the db helper.
Vue.prototype.$db = DBHelper;

// use this as an event bus to trigger initMap in vue instances.
const eventBus = new Vue();

Vue.prototype.$bus = eventBus;

window.initMap = () => {
  eventBus.$emit('initMap');
};

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
