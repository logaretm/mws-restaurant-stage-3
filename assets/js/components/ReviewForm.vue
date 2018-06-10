<template>
  <form action="/api/reviews" @submit.prevent="onSubmit" class="reviews__form">
    <div :class="{ 'reviews__form-overlay': true, 'is-submitting': isSubmitting }">
      <loader></loader>
      <p class="reviews__form-message">Submitting Your Review</p>
    </div>
    <div class="field">
      <label class="form__label">Name</label>
      <input class="input" type="text" name="name" placeholder="Your Name" required v-model="name">
    </div>
    <div class="field">
      <label class="form__label">Comments</label>
      <textarea class="input" name="comments" rows="5" :placeholder="`Describe your experience at ${restaurantName}`" required v-model="comments"></textarea>
    </div>
    <div class="field">
      <label class="form__label">Rating</label>
      <input class="input" type="number" max="5" min="1" step="1" v-model.number="rating">
    </div>

    <button type="submit" class="form__submit">Submit</button>
  </form>
</template>

<script>
import Loader from './Loader';

export default {
  components: {
    Loader
  },
  props: {
    restaurantId: {
      type: [String, Number],
      required: true
    },
    restaurantName: {
      type: String,
      required: true
    }
  },
  data: () => ({
    name: '',
    comments: '',
    rating: 3,
    isSubmitting: false
  }),
  methods: {
    onSubmit () {
      this.isSubmitting = true;
      const review = {
        id: `temp_${Date.now()}`,
        name: this.name,
        comments: this.comments,
        rating: this.rating,
        restaurantId: this.restaurantId,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      this.$emit('submit', review);

      this.$db.postReview({
        name: this.name,
        comments: this.comments,
        rating: this.rating,
        restaurantId: this.restaurantId
      }).then(rev => {
        // update id
        review.id = rev.id;
        this.isSubmitting = false;
        this.$notify({
          message: `Your review was ${this.$isOnline ? 'submitted' : 'saved'} successfully${this.$isOnline ? '' : ' and will be posted once you are online'}.`,
          type: 'success'
        });
      }).catch(e => {
        this.$notify({
          message: e.message,
          type: 'error'
        });
      });
    }
  }
};
</script>

<style lang="stylus">
.field
  display block
  &:not(:last-child)
    margin-bottom .75rem

.form__label
  font-size 1rem
  display block
  &:not(:last-child)
    margin-bottom .5em

.form__submit
  background-color #2366d1
  border-color transparent
  color #fff
  cursor pointer
  justify-content center
  padding-bottom calc(.375em - 1px)
  padding-left .75em
  padding-right .75em
  padding-top calc(.375em - 1px)
  text-align center
  white-space nowrap
  font-size 1rem
  border-radius 2px

@media screen and (max-width: 480px)
  .form__submit
    width: 100%

.input
  border 1px solid transparent
  font-size 1rem
  position relative
  max-width 100%
  width 100%
  padding-bottom calc(.375em - 1px)
  padding-left calc(.625em - 1px)
  padding-right calc(.625em - 1px)
  padding-top calc(.375em - 1px)
  border-radius 2px
  &:invalid
    border-color #ff3860
  &:valid
    border-color #23d160

.reviews__form
  position: relative

.reviews__form-overlay
  opacity: 0
  background: rgba(243, 243, 243, 0.89)
  display: flex
  height: 100%
  width: 100%
  align-items: center
  justify-content: center
  flex-direction: column
  position: absolute
  transition: 250ms all ease-in-out
  z-index: -1
  &.is-submitting
    opacity: 1
    z-index: 10

.reviews__form-message
  font-size: 22px
</style>
