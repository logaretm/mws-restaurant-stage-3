<template>
  <div>
    <google-map :location="center" :markers="[marker]" :zoom="16"></google-map>
    <section class="restaurant__container">
      <div class="restaurant__details">
        <h2 class="restaurant__name">{{ restaurant.name }}</h2>
        <img class="restaurant__img" src="imageUrl" :alt="`${restaurant.name} Restaurant in ${restaurant.neighborhood}`">
        <p class="restaurant__cuisine">{{ restaurant.cuisine_type }}</p>
        <p class="restaurant__address">{{ restaurant.address }}</p>
        <table class="restaurant__hours" v-if="restaurant.operatingHours">
          <tbody>
            <tr v-for="key in restaurant.operatingHours" :key="key">
              <td>{{ key }}</td>
              <td>{{ restaurant.operatingHours[key] }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="restaurant__reviews">
        <h3 class="restaurant__reviews__title" v-if="reviews.length">Reviews</h3>
        <p v-else>No reviews yet!</p>
        <ul class="reviews__list">
          <review v-for="review in reviews" :review="review" :key="review.id"></review>
        </ul>
      </div>

    </section>
  </div>
</template>

<script>
import GoogleMap from '../components/Map';

export default {
  components: {
    GoogleMap
  },
  computed: {
    imageUrl () {
      return this.$db.imageUrlForRestaurant(this.restaurant);
    },
    restaurantId () {
      const url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
      const results = regex.exec(url);

      if (!results) return null;

      if (!results[2]) return '';

      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  },
  methods: {
    fetch () {
      if (!this.restaurantId) {
        // handle not specifying an id.
        return;
      }

      this.$db.fetchRestaurantById(this.restaurantId).then(restaurant => {
        this.restaurant = restaurant;
        this.marker = this.$db.createMarkerData(restaurant);
        this.$bus.$emit('fillbreadCrumb', [restaurant]);
      });
    }
  }
};
</script>

<style lang="stylus">
.reviews__list
  margin: 0
  padding: 0
  padding-bottom: 30px
  list-style-type: none
  width: 100%

.restaurant__reviews
  margin-top: 30px
  display: flex
  flex-direction: column

.restaurant__reviews__title
  font-size: 18pt
  color: #f18200
  margin-top: 20px
  display: flex
  font-weight: 100
  flex-direction: column

.restaurant__name
  color: #f18200
  font-family: 'Open Sans', Arial,sans-serif
  font-size: 20pt
  font-weight: 200
  letter-spacing: 0
  margin: 15px 0 30px
  text-transform: uppercase
  line-height: 1.1


.restaurant__img
  width: 100%
  display: block
  height: auto


.restaurant__address
  font-size: 12pt
  margin: 10px 0px


.restaurant__cuisine
  background-color: #333
  color: #ddd
  font-size: 12pt
  font-weight: 300
  letter-spacing: 10px
  margin: 10px 0 20px
  padding: 2px 0
  text-align: center
  text-transform: uppercase
  width: 100%


.restaurant__hours td
  color: #666

.restaurant__container
  border-bottom: 1px solid #d9d9d9
  border-top: 1px solid #fff
  padding: 140px 40px 30px
  flex-basis: 50%
  max-width: 50%

@media only screen and (min-width: 1200px)
  .restaurant__container
    flex-basis: 50%
    max-width: 50%
    margin-top: 0


@media (min-width: 768px) and (max-width: 979px)
  .restaurant__container
    flex-basis: 50%
    max-width: 50%
    margin-top: 0


@media only screen and (max-width: 767px)
  .restaurant__container
    flex-basis: 100%
    max-width: 100%
    margin-top: 300px

@media (max-width: 480px)
  .restaurant__container
    flex-basis: 100%
    max-width: 100%
    margin-top: 300px

</style>
