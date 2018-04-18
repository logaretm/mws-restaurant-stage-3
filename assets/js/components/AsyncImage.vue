<template>
  <div class="img__container">
    <img :src="src" :alt="alt" v-if="loaded" class="async__image">
    <img class="placeholder__image" v-else src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" :alt="alt">
  </div>
</template>

<script>
const callback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && typeof entry.target.$notifyInView === 'function') {
      entry.target.$notifyInView();
    }
  });
};


const observer = new IntersectionObserver(callback, { root: null });

export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loaded: false
  }),
  mounted () {
    this.$once('inView', () => {
      const img = new Image();
      img.src = this.src;
      img.onload = () => {
        this.loaded = true;
      };
      img.onerror = () => {
        this.loaded = true;
      };
      observer.unobserve(this.$el);
    });

    this.$el.$notifyInView = () => {
      this.$emit('inView');
    };

    observer.observe(this.$el);
  }
};
</script>

<style lang="stylus">
.async__img
  -webkit-animation: 1s ease 0s normal forwards 1 loadIn
  animation: 1s ease 0s normal forwards 1 loadIn

@keyframes loadIn {
  0% { opacity:0; }
  66% { opacity:0; }
  100% { opacity:1; }
}

.placeholder__image
  background-color: #ccc
  display: block
  margin: 0
  width: 100%
  height: 100%
  min-height: 100px
</style>

