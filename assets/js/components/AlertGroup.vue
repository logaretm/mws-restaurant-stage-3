<template>
  <transition-group name="alerts" tag="div" class="alerts-group">
    <alert v-if="isOffline" icon="disconnected" key="progress" :message="`You are now offline`" type="warning"></alert>
    <alert v-for="alert in alerts" :icon="alert.icon || 'close'" :key="alert.id" :message="alert.message" :type="alert.type" @dismiss="remove(alert)"></alert>
  </transition-group>
</template>

<script>
import Alert from './Alert';

export default {
  name: 'alert-group',
  components: {
    Alert
  },
  data: () => ({
    id: 0,
    alerts: [],
    isOffline: false
  }),
  methods: {
    remove (alert) {
      const idx = this.alerts.indexOf(alert);
      if (idx !== -1) {
        this.alerts.splice(idx, 1);
      }
    }
  },
  created () {
    // initialize the offiline prop.
    this.isOffline = !this.$isOnline;

    // listen for events.
    this.$bus.$on('notification', payload => {
      this.alerts.push(
        Object.assign({}, payload, { id: this.id })
      );

      this.id++;
    });
    this.$bus.$on('offline', () => {
      this.isOffline = true;
    });
    this.$bus.$on('online', () => {
      this.isOffline = false;
    });
  }
};
</script>

<style lang="stylus">
.alerts-group
  display: flex
  flex-direction: column
  position: fixed
  width: 100%
  max-width: 30vw
  margin: 10px
  z-index: 99
  right: 0
  bottom: 0

  @media screen and (max-width: 480px)
    max-width: 100%

  @media screen and (max-width 767px)
    max-width: 50vw

.alerts-enter-active, .alerts-leave-active
  transition: opacity 0.5s, transform 0.5s

.alerts-enter, .alerts-leave-active
  opacity: 0
  transform: translateX(200vw)
</style>
