<template>
  <form action="" @submit.prevent="onSubmit">
    <label>
      Name
      <input type="text" name="name" placeholder="Your Name" required v-model="name">
    </label>
    <label>
      Comments
      <textarea name="comments" rows="5" :placeholder="`Describe your experience at ${restaurantName}`" required v-model="comments"></textarea>
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
