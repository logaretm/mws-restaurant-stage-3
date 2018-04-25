<template>
  <li class="restaurant__card">
    <async-image :sources="images" :alt="`${restaurant.name} Restaurant in ${restaurant.neighborhood}`" classes="restaurant__card-img"></async-image>
    <div class="restaurant__card__body">
      <h2>{{ restaurant.name }}</h2>
      <p class="restaurant__card-neighborhood">{{ restaurant.neighborhood }}</p>
      <p class="restaurant__card-address">{{ restaurant.address }}</p>
      <a :href="url" class="restaurant__details__link">View Details</a>
    </div>
  </li>
</template>

<script>
import AsyncImage from './AsyncImage';

export default {
  name: 'restaurant-card',
  components: {
    AsyncImage
  },
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
  computed: {
    url () {
      return this.$db.urlForRestaurant(this.restaurant);
    },
    images () {
      return this.$db.imageUrlForRestaurant(this.restaurant);
    }
  }
}
</script>

<style lang="stylus">
.restaurant__card
  background-color: #fff
  border: 0
  font-family: 'Open Sans', Arial,sans-serif
  margin: 15px
  min-height: 380px
  text-align: left
  padding: 0
  width: 270px
  border-radius: 25px 0
  overflow: hidden
  flex-basis: 16.66666667%
  max-width: 16.66666667%
  box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.05)

  .restaurant__card-neighborhood
    color: gray

.restaurant__card-img
  background-color: #ccc
  display: block
  margin: 0
  width: 100%
  height: 100%
  object-fit: cover


.restaurant__card__body
  padding: 0 30px 25px
  display: flex
  flex-direction: column


.restaurant__card__body h2
  color: #f18200
  font-family: 'Open Sans', Arial,sans-serif
  font-size: 14pt
  font-weight: 200
  letter-spacing: 0
  line-height: 1.3
  margin: 20px 0 10px
  text-transform: uppercase


.restaurant__card__body p
  margin: 0
  font-size: 11pt


.restaurant__details__link
  background-color: #f18200
  border-bottom: 3px solid #eee
  color: #0D0D0D
  display: inline-block
  font-size: 12pt
  margin: 15px 0 0
  padding: 8px 30px 10px
  text-align: center
  text-decoration: none
  text-transform: uppercase
  &:hover
    color: #040e15

@media only screen and (min-width: 1200px)
  .restaurant__card
    flex-basis: 16.66666667%
    max-width: 16.66666667%

@media (min-width: 768px) and (max-width: 979px)
  .restaurant__card
    flex-basis: 33.33333333%
    max-width: 33.33333333%

@media only screen and (max-width: 767px)
  .restaurant__card
    flex-basis: 33.33333333%
    max-width: 33.33333333%

@media (max-width: 480px)
  .restaurant__card
    flex-basis: 100%
    max-width: 100%
    display: flex
    align-items: center
    min-height: auto
  .img__container
    height: 100%
    width: 35%

  .restaurant__card-address
    display: none

  .restaurant__details__link
    display: none

</style>
