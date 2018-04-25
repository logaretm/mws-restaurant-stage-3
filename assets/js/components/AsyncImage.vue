<template>
  <div class="img__container">
    <picture v-if="loaded">
      <source v-for="source in sources" :key="source.src" :srcset="source.src" :type="source.type">
      <img :src="fallbackSrc" :alt="alt" :class="['async__imag', $attrs.class]">
    </picture>
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


// check webp support
const checkWebpSupport = new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(true);
  img.onerror = () => resolve(false);

  img.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA=';
});

export default {
  inheritAttrs: false,
  props: {
    sources: {
      type: Array,
      default: []
    },
    alt: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loaded: false
  }),
  computed: {
    fallbackSrc () {
      // the fallback should be a widely supported format.
      const jpg = this.sources.find(image => image.type === 'image/jpg');
      if (!jpg) {
        console.log('There is no JPG fallback!');
      }
      return jpg && jpg.src;
    }
  },
  mounted () {
    this.$once('inView', () => {
      checkWebpSupport.then(supported => {
        const img = new Image();
        img.src = this.sources.find(source => source.type.includes(supported ? 'webp' : 'jpg')).src;
        img.onload = () => {
          this.loaded = true;
        };
        img.onerror = () => {
          this.loaded = true;
        };
        observer.unobserve(this.$el);
      })
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

