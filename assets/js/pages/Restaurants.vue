<template>
<div>
  <google-map :location="center" :markers="markers"></google-map>

  <section>
    <restaurant-filters @update="fetch"></restaurant-filters>
    <ul class="restaurants__list">
      <restaurant-card
        v-for="restaurant in filteredRestaurants"
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
  name: 'restaurants-page',
  components: {
    RestaurantFilters,
    RestaurantCard,
    GoogleMap
  },
  data: () => ({
    restaurants: [],
    filters: {
      cuisine_type: null,
      neighborhood: null
    },
    center: {
      lat: 40.722216,
      lng: -73.987501
    }
  }),
  computed: {
    filteredRestaurants () {
      return this.restaurants.filter(restaurant => {
        const matchesCuisine = this.filters.cuisine_type ? restaurant.cuisine_type === this.filters.cuisine_type : true;
        const matchesNeighborhood = this.filters.neighborhood ? restaurant.neighborhood === this.filters.neighborhood : true;

        return matchesCuisine && matchesNeighborhood;
      });
    },
    markers () {
      return this.restaurants.map(restaurant => {
        return this.$db.createMarkerData(restaurant);
      });
    }
  },
  methods: {
    fetch ({ cuisine, neighborhood } = {}) {
      this.filters.cuisine_type = cuisine;
      this.filters.neighborhood = neighborhood;
      this.$db.fetchRestaurants({ cuisine, neighborhood }).then(restaurants => {
        this.restaurants = restaurants;
      }).catch(err => {
        // Don't handle error if The user have data, or he is offline.
        if (this.restaurants.length || !this.$isOnline) {
          return;
        }

        console.log(err.message);
      });
    }
  },
  mounted () {
    this.$store.populate().then(({ restaurants }) => {
      this.restaurants = restaurants;
      this.fetch();
    });
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
