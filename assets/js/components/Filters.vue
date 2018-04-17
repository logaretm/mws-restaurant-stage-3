<template>
  <div class="filter-options">
    <h2>Filter Results</h2>
    <select name="neighborhoods" title="Neighborhood selector" v-model="selected.neighborhood">
      <option value="">All Neighborhoods</option>
      <option v-for="neighborhood in neighborhoods" :key="neighborhood" :value="neighborhood">{{ neighborhood }}</option>
    </select>
    <select name="cuisines" title="Cuisines selector" v-model="selected.cuisine">
      <option value="">All Cuisines</option>
      <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'rr-filters',
  data: () => ({
    neighborhoods: [],
    cuisines: [],
    selected: {
      neighborhood: '',
      cuisine: ''
    }
  }),
  created () {
    this.$db.fetchNeighborhoods().then(ns => {
      this.neighborhoods = ns;
    });

    this.$db.fetchCuisines().then(cs => {
      this.neighborhoods = cs;
    });
  },
  watch: {
    selected (value) {
      this.$emit('update', value);
    }
  }
};
</script>

<style lang="stylus">
.filter-options
  width: 100%
  height: fit-content
  background-color: #3397DB
  align-items: center
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: center

.filter-options h2
  color: white
  font-size: 1rem
  font-weight: normal
  line-height: 1
  margin: 0 20px


.filter-options select
  background-color: white
  border: 1px solid #fff
  font-family: 'Open Sans', Arial,sans-serif
  font-size: 11pt
  height: 35px
  letter-spacing: 0
  margin: 10px
  padding: 0 10px
  width: 200px


@media only screen and (max-width: 767px)
  .filter-options
    padding-top: 10px
    flex-direction: column
    align-items: center

@media (max-width: 480px)
  .filter-options
    padding-top: 10px
    flex-direction: column
    align-items: center

</style>
