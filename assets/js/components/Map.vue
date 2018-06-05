<template>
  <section :class="{ 'map__container': layout !== 'full', 'side__map__container': layout === 'full', 'is-lazy': !isInteractive }">
    <div class="map__overlay" @click="isInteractive = true" v-if="!isInteractive">
      <p>Click to intereact with the map</p>
    </div>
    <img v-if="!isInteractive && staticMap" :src="staticMap" :alt="title" title="Click to activate map" class="map__img">
    <div ref="map" :title="title" role="application" :class="{ 'map': true, 'map__full': layout === 'full', 'hidden': !isInteractive }"></div>
  </section>
</template>

<script>
let loaded = false;

export default {
  name: 'google-map',
  props: {
    title: {
      type: String,
      required: true
    },
    layout: {
      type: String
    },
    location: {
      type: Object,
      required: true
    },
    zoom: {
      type: Number,
      default: 12
    },
    markers: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    markersInstances: [],
    isLoaded: loaded,
    isInteractive: false,
    staticMap: null
  }),
  methods: {
    initMap () {
      this.$map = new window.google.maps.Map(this.$refs.map, {
        zoom: this.zoom,
        center: this.location,
        scrollwheel: false
      });
      loaded = true;
      this.isLoaded = true;
      this.updateMarkers();
    },
    loadScript () {
      const script = document.createElement('script');
      script.defer = true;
      script.async = true;
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAlPcdc6Nq5JXLgjx0bpAdPwTA2cevTgIk&libraries=places&callback=initMap';
      script.onerror = () => {
        console.log('Failed to load the map');
      };
      document.body.appendChild(script);
    },
    updateMarkers () {
      this.staticMap = this.makeStaticMapUrl();

      if (!loaded) return;

      this.markersInstances.forEach(m => m.setMap(null));
      this.markersInstances = this.markers.map(markerData => {
        const marker = new window.google.maps.Marker(Object.assign({}, markerData, {
          map: this.$map,
          animation: window.google.maps.Animation.DROP
        }));

        window.google.maps.event.addListener(marker, 'click', () => {
          window.location.href = marker.url;
        });

        return marker;
      });
    },
    makeStaticMapUrl () {
      const center = `${this.location.lat},${this.location.lng}`;
      const size = `600x400`;
      const markers = this.markers.reduce((carry, marker) => {
        carry += `|${marker.position.lat},${marker.position.lng}`;

        return carry;
      }, '');
      return `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${this.zoom}&size=${size}&markers=color:red${markers}&key=AIzaSyAlPcdc6Nq5JXLgjx0bpAdPwTA2cevTgIk`;
    }
  },
  watch: {
    markers () {
      // map isn't loaded yet.
      this.staticMap = this.makeStaticMapUrl();
      if (!loaded) {
        return this.$once('mapLoaded', () => {
          this.updateMarkers();
        });
      }

      this.updateMarkers();
    },
    isInteractive () {
      const loadCallback = () => {
        this.initMap();
        this.$emit('mapLoaded');
      };

      if (loaded) {
        loadCallback();
        return;
      }

      this.$bus.$once('initMap', loadCallback);
      this.loadScript();
    }
  },
  mounted () {
    this.staticMap = this.makeStaticMapUrl();
  }
};
</script>

<style lang="stylus">
.map
  height: 400px
  width: 100%
  background-color: #ccc

.side__map__container
  background: #ccc none repeat scroll 0 0
  height: 87%
  position: fixed
  right: 0
  top: 80px
  flex-basis: 50%
  max-width: 50%
  width: 50%
  .map__img
    height: 100%
  &.is-lazy
    &:hover
      .map__overlay
        opacity: 1

.map__full
  background-color: #ccc
  height: 100%
  width: 100%

@media only screen and (min-width: 1200px)
  .side__map__container
    flex-basis: 50%
    max-width: 50%
    width: 50%
    height: 100%
    position: fixed

@media (min-width: 768px) and (max-width: 979px)
  .side__map__container
    flex-basis: 50%
    max-width: 50%
    width: 50%
    height: 100%
    position: fixed

@media only screen and (max-width: 767px)
  .side__map__container
    flex-basis: 100%
    max-width: 100%
    width: 100%
    height: 300px
    position: relative
    display: flex
    justify-content: center
    align-items: center
    top: 0

@media only scrren and (max-width: 480px)
  .side__map__container
    flex-basis: 100%
    max-width: 100%
    width: 100%
    height: 300px
    position: relative
    display: flex
    justify-content: center
    align-items: center
    top: 0

.map__container
  display: flex
  justify-content: center
  align-items: center
  &.is-lazy
    position: relative
    &:hover
      .map__overlay
        opacity: 1

.map__img
  position: absolute
  max-height: 400px

.hidden
  opacity: 0
  cursor: pointer

.map__overlay
  background: rgba(243, 243, 243, 80)
  position: absolute
  cursor: pointer
  top: 0
  right: 0
  bottom: 0
  left: 0
  background: rgba(0,0,0,0.8)
  display: flex
  justify-content: center
  align-items: center
  opacity: 0
  z-index: 99
  transition: 250ms all ease-in-out
  p
    color: #fff
    font-size: 14pt

</style>
