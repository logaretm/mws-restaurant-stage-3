<template>
  <div :class="classes" class="alert" role="alert">
    <p>{{ message }}</p>
    <a href="#" @click.prevent="$emit('dismiss')" class="alert-icon" :role="iconRole">
      <icon :icon="icon"></icon>
    </a>
  </div>
</template>

<script>
import Icon from './Icon';

export default {
  name: 'alert',
  components: {
    Icon
  },
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
    iconRole () {
      if (this.icon === 'close') {
        return 'button';
      }

      return 'img';
    }
  }
};
</script>

<style lang="stylus">
.alert
  padding: 20px
  background: #000
  color: #fff
  margin-bottom: 20px
  position: relative
  margin-bottom: 10px
  padding: 5px 20px

  p
    font-size: 20px
    color: #fff

  &.is-info
    background: hsl(204, 86%, 53%)

  &.is-success
    background: hsl(141, 71%, 48%)

  &.is-danger
    background: hsl(348, 100%, 61%)

  &.is-warning
    background: hsl(48, 100%, 67%)
    p
      color: #333
    svg
      fill: #333

.alert-icon
  position: absolute
  padding: 0
  width: 20px
  height: 20px
  top: 20px
  right: 40px
  color: #fff
  font-size: 22px
  svg
    fill: #fff
  &:hover
    svg
      fill: #000

</style>
