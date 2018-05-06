<template>
  <form action="" @submit.prevent="onSubmit">
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
        <input class="input" type="numeric" max="5" min="1" step="1" v-model.number="rating">
      </div>

      <button type="submit" class="form__submit">Submit</button>
  </form>
</template>

<script>
export default {
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

      this.$emit('submitted', review);

      this.$db.postReview({
        name: this.name,
        comments: this.comments,
        rating: this.rating,
        restaurantId: this.restaurantId
      }).catch(e => {
        console.log(e);
      }).then(rev => {
        // update id
        review.id = rev.id;
        this.isSubmitting = false;
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
</style>
