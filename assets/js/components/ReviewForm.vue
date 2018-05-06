<template>
  <form action="" @submit.prevent="onSubmit">
    <label>
      Name
      <input type="text" name="name" placeholder="Your Name" required v-model="name">
    </label>
    <label>
      Comments
      <textarea name="comments" rows="5" placeholder="Describe your experience" required v-model="comments"></textarea>
    </label>
    <label>
      Rating
      <input type="numeric" max="5" min="1" step="1" v-model.number="rating">
    </label>
  </form>
</template>

<script>
export default {
  props: {
    restaurantId: {
      type: [String, Number],
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
    async onSubmit () {
      try {
        this.isSubmitting = true;
        await this.$db.postReview({
          name: this.name,
          comments: this.comments,
          rating: this.rating,
          restaurantId: this.restaurantId
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>
