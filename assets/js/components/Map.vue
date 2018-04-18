<template>
  <section :class="{ 'side__map__container': layout === 'full' }">
    <div ref="map" role="application" class="map"></div>
  </section>
</template>

<script>
// singleton boolean for all instances, to prevent multiple loading of the script tag.
// useful if this is gonna be a SPA later.
let loaded = false;

export default {
  name: 'google-map',
  props: {
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
    markersInstances: []
  }),
  methods: {
    initMap () {
      this.$map = new google.maps.Map(this.$refs.map, {
        zoom: this.zoom,
        center: this.location,
        scrollwheel: false
      });
      loaded = true;
      this.updateMarkers();
    },
    loadScript () {
      const script = document.createElement('script');
      script.defer = true;
      script.async = true;
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAlPcdc6Nq5JXLgjx0bpAdPwTA2cevTgIk&libraries=places&callback=initMap';
      document.body.appendChild(script);
    },
    updateMarkers () {
      this.markersInstances.forEach(m => m.setMap(null));
      this.markersInstances = this.markers.map(markerData => {
        const marker = new google.maps.Marker(Object.assign({}, markerData, {
          map: this.$map,
          animation: google.maps.Animation.DROP,
        }));

        google.maps.event.addListener(marker, 'click', () => {
          window.location.href = marker.url
        });

        return marker;
      });
    }
  },
  watch: {
    markers () {
      // map isn't loaded yet.
      if (!loaded) {
        return this.$once('mapLoaded', () => {
          this.updateMarkers();
        });
      }

      this.updateMarkers();
    }
  },
  mounted () {
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
};
</script>

<style lang="stylus">
.map
  height: 400px
  width: 100%
  background-color: #ccc

.side__map__container
  background: blue none repeat scroll 0 0
  height: 87%
  position: fixed
  right: 0
  top: 80px
  flex-basis: 50%
  max-width: 50%
  width: 50%

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
    position: absolute

@media (max-width: 480px)
  .side__map__container
    flex-basis: 100%
    max-width: 100%
    width: 100%
    height: 300px
    position: absolute

</style>
