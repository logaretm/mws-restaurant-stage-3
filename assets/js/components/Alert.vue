<template>
  <div :class="classes" class="alert" role="alert">
    <p>{{ message }}</p>
    <a href="#" @click.prevent="$emit('dismiss')" class="alert-icon" role="button">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path :d="iconPath"></path>
      </svg>
    </a>
  </div>
</template>

<script>
const icons = {
  close: 'M22 4.72L19.28 2 12 9.28 4.72 2 2 4.72 9.28 12 2 19.28 4.72 22 12 14.72 19.28 22 22 19.28 14.72 12 22 4.72z',
  disconnected: 'M18,3V16.18L21,19.18V3H18M4.28,5L3,6.27L10.73,14H8V21H11V14.27L13,16.27V21H16V19.27L19.73,23L21,21.72L4.28,5M13,9V11.18L16,14.18V9H13M3,18V21H6V18H3Z'
};

export default {
  name: 'alert',
  props: {
    icon: {
      type: String,
      default: 'close'
    },
    message: {
      type: String,
      required: true
    },
    dismiss: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'info',
      validator: value => {
        return ['info', 'error', 'success', 'warning'].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    classes () {
      return {
        'is-danger': this.type === 'error',
        'is-info': this.type === 'info',
        'is-warning': this.type === 'warning',
        'is-success': this.type === 'success'
      };
    },
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

.alert
  padding: 20px
  background: #000
  color: #fff
  margin-bottom: 20px
  position: relative

  p
    font-size: 20px

  &.is-info
    background: hsl(204, 86%, 53%)

  &.is-success
    background: hsl(141, 71%, 48%)

  &.is-danger
    background: hsl(348, 100%, 61%)

  &.is-warning
    background: hsl(48, 100%, 67%)
    fill: #333

.alert-icon
  position: absolute
  width: 20px
  height: 20px
  top: 5px
  right: 20px
  color: #fff
  font-size: 22px

  svg
    fill: #fff

  &:hover
    svg
      fill: #000

</style>
