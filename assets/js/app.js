import Vue from 'vue';

import RestaurantsPage from './pages/Restaurants';
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
    RestaurantsPage
  },
  created () {
    navigator.serviceWorker.register('sw.js');
  }
});
