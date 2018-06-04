<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"></path>
    <path :d="iconPath"></path>
  </svg>
</template>

<script>
const icons = {
  review: 'M18,8H6V6H18V8M18,11H6V9H18V11M18,14H6V12H18V14M22,4A2,2 0 0,0 20,2H4A2,2 0 0,0 2,4V16A2,2 0 0,0 4,18H18L22,22V4Z',
  close: 'M22 4.72L19.28 2 12 9.28 4.72 2 2 4.72 9.28 12 2 19.28 4.72 22 12 14.72 19.28 22 22 19.28 14.72 12 22 4.72z',
  disconnected: 'M18,3V16.18L21,19.18V3H18M4.28,5L3,6.27L10.73,14H8V21H11V14.27L13,16.27V21H16V19.27L19.73,23L21,21.72L4.28,5M13,9V11.18L16,14.18V9H13M3,18V21H6V18H3Z',
  heart: 'M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z',
  'heart-outline': 'M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z'
};

export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    iconPath () {
      return icons[this.icon];
    }
  }
};
</script>

<style lang="stylus">
.icon
  display: inline-block
  width: 1.5em
  height: 1.5em
  stroke-width: 0
  stroke: #fff
  fill: #fff
  color: #000
</style>
