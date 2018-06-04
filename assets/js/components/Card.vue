<template>
  <li class="restaurant__card">
    <figure class="restuarnat__card-header">
      <async-image :sources="images" :alt="`${restaurant.name} Restaurant in ${restaurant.neighborhood}`" classes="restaurant__card-img"></async-image>
      <figcaption class="restaurant__card-overlay">
        <a :class="{ 'restaurant__card-action': true, 'is-favorite': isFavorite }" href="#" role="button" :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'" @click.prevent="toggleFavorite">
          <icon :icon="isFavorite ? 'heart' : 'heart-outline'"></icon>
        </a>
        <router-link :to="url" class="restaurant__card-action" title="Post a review">
          <icon icon="review"></icon>
        </router-link>
      </figcaption>
    </figure>
    <div class="restaurant__card__body">
      <h2 class="restaurant__card-title">{{ restaurant.name }}</h2>
      <p class="restaurant__card-neighborhood">{{ restaurant.neighborhood }}</p>
      <p class="restaurant__card-address">{{ restaurant.address }}</p>
    </div>
    <router-link :to="url" class="restaurant__details__link">View Details</router-link>
  </li>
</template>

<script>
import AsyncImage from './AsyncImage';
import Icon from './Icon';

export default {
  name: 'restaurant-card',
  components: {
    AsyncImage,
    Icon
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
    },
    isFavorite () {
      return this.restaurant.is_favorite;
    }
  },
  methods: {
    toggleFavorite () {
      this.$db.favoriteRestaurant(this.restaurant, !this.restaurant.is_favorite);
    }
  }
};
</script>

<style lang="stylus">
.restaurant__card
  background-color: #fff
  display: flex
  position: relative
  flex-direction: column
  border: 0
  font-family: 'Open Sans', Arial,sans-serif
  margin: 15px
  min-height: 380px
  text-align: left
  padding: 0
  border-radius: 25px 0
  overflow: hidden
  flex-basis: 16.66666667%
  max-width: 16.66666667%
  box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.05)

.restuarnat__card-header
  margin: 0
  position: relative
  &:hover
    .restaurant__card-overlay
      opacity: 1
    .restaurant__card-action
      transform: none
      &:hover
        transform: scale(1.1)

.restaurant__card-overlay
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  background: rgba(0,0,0,0.8)
  display: flex
  justify-content: center
  align-items: center
  opacity: 0
  transition: 250ms all ease-in-out

.restaurant__card-action
  padding: 0
  width: 50px
  height: 50px
  background: #fff
  text-align: center
  border-radius: 200px
  margin: 0 5px
  z-index: 2
  display: flex;
  justify-content: center
  align-items: center
  transition: 150ms all ease-in-out
  transform: translateX(25px)
  svg
    fill: #000
  &.is-favorite
    svg
      fill: hsl(348, 100%, 61%)

.restaurant__card-neighborhood
  color: #515151
  margin: 0
  font-size: 11pt

.restaurant__card-address
  margin: 0
  font-size: 11pt

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

.restaurant__card-title
  color: #363636
  font-family: 'Open Sans', Arial,sans-serif
  font-size: 1.5rem
  font-weight: 200
  letter-spacing: 0
  line-height: 1.3
  margin: 20px 0 10px
  text-transform: uppercase

.restaurant__details__link
  background-color: #2366d1
  border: 0px
  color: #fff
  display: inline-block
  font-size: 12pt
  margin-top: auto
  padding: 8px 30px 10px
  text-align: center
  text-decoration: none
  text-transform: uppercase
  &:hover
    background-color: #164083
    color: #fff

@media only screen and (min-width: 1200px)
  .restaurant__card
    flex-basis: 16.66666667%
    max-width: 16.66666667%

@media (min-width: 768px) and (max-width: 1000px)
  .restaurant__card
    flex-basis: 33.33333333%
    max-width: 33.33333333%

@media (max-width: 767px)
  .restaurant__card
    flex-basis: 100%
    max-width: 100%
    display: flex
    align-items: center
    min-height: auto
    flex-direction: row
  .img__container
    height: 100%
    width: 100%
    min-width: 100%
  .restuarnat__card-header
    height: 100%
    max-width: 35%
    min-width: 35%

  .restaurant__card-address
    display: none

  .restaurant__details__link
    display: none

</style>
