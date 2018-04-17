<template>
<div>
  <google-map :location="center" :markers="markers"></google-map>

  <section>
    <restaurant-filters @update="fetch"></restaurant-filters>
    <ul class="restaurants__list">
      <restaurant-card
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      ></restaurant-card>
    </ul>
  </section>
</div>
</template>

<script>
import RestaurantFilters from '../components/Filters';
import RestaurantCard from '../components/Card';
import GoogleMap from '../components/Map';

export default {
  name: 'page-restaurants',
  components: {
    RestaurantFilters,
    RestaurantCard,
    GoogleMap
  },
  data: () => ({
    restaurants: [],
    markers: [],
    center: {
      lat: 40.722216,
      lng: -73.987501
    }
  }),
  methods: {
    fetch ({ cuisine, neighborhood } = {}) {
      return this.$db.fetchRestaurants({ cuisine, neighborhood }).then(restaurants => {
        this.restaurants = restaurants;
        this.createMarkers();
      });
    },
    createMarkers (restaurants) {
      this.markers = this.restaurants.map(restaurant => {
        return this.$db.createMarkerData(restaurant);
      });
    }
  },
  created () {
    this.fetch();
  }
};
</script>

<style lang="stylus">
.restaurants__list
  background-color: #f3f3f3
  list-style: outside none none
  text-align: center
  width: 100%
  display: flex
  padding: 0
  flex-wrap: wrap
  justify-content: center
  align-items: stretch
  margin-top: 0px
  margin-bottom: 0px

</style>
