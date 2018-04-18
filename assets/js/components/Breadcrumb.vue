<template>
  <ul class="breadcrumb" aria-label=Breadcrumb>
    <li>
      <a href="/">Home</a>
    </li>
    <li v-for="item in items" :key="item.url">
      <a href="item.url" :aria-current="isCurrent(item.url) ? 'page' : false">{{ item.title }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({
    items: []
  }),
  methods: {
    isCurrent (url) {
      return url && url.contains(window.location.href);
    }
  },
  created () {
    this.$bus.$on('fillBreadcrumb', items => this.items = items);
  }
};
</script>


<style lang="stylus">
.breadcrumb
  padding: 10px 40px 16px
  list-style: none
  background-color: #eee
  font-size: 17px
  margin: 0
  width: 50%


/* Display list items side by side */
.breadcrumb li
  display: inline


/* Add a slash symbol (/) before/behind each list item */
.breadcrumb li+li:before
  padding: 8px
  color: black
  content: "/\00a0"


/* Add a color to all links inside the list */
.breadcrumb li a
  color: #0275d8
  text-decoration: none


/* Add a color on mouse-over */
.breadcrumb li a:hover
  color: #01447e
  text-decoration: underline


.breadcrumb li a[aria-current="page"]
  color: #000

@media only screen and (max-width: 767px)
  .breadcrumb
    width: 100%

</style>
