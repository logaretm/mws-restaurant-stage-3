<template>
  <li class="review__item">
    <div class="review__item__header">
      <h3>{{ review.name }}</h3>
      <span class="review__item__timestamp">{{ review.date }}</span>
    </div>
    <div class="review__item__body">
      <span class="review__item__rating">{{ review.rating }}</span>
      <p class="review__item__comments">{{ review.comments }}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    review: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="stylus">
.review__item
  background-color: #fff
  border: 2px solid #f3f3f3
  display: block
  list-style-type: none
  margin: 0 0 30px
  position: relative
  width: 100%
  border-radius: 25px 0


.review__item__header
  display: flex
  padding: 20px
  align-items: center
  justify-content: space-between
  width: 100%
  background-color: #252831
  color: #fff
  border-radius: 25px 0 0


.review__item__body
  padding: 20px
  display: flex
  flex-direction: column


.review__item__rating
  background-color: #f18200
  color: #fff
  width: fit-content
  font-size: 16px
  border-radius: 2px
  padding: 5px 15px


.review__item__header h2
  margin: 0
  font-weight: 100


.review__item__timestamp
  color: #959292
  font-size: 14px
  font-weight: bold

.review__item__comments
  font-size: 12pt

</style>
