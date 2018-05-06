<template>
  <div id="app">
    <header :class="{ 'header__fixed': $route.meta.layout === 'split' }">
      <nav>
        <h1>
          <a href="/">Restaurant Reviews</a>
        </h1>
      </nav>
      <breadcrumb v-if="$route.meta.breadcrumb"></breadcrumb>
    </header>

    <main id="maincontent" :class="{ 'split__view': $route.meta.layout === 'split' }">
      <router-view></router-view>
    </main>

    <footer :class="{ footer: true, footer__full: $route.meta.layout !== 'split' }">
      Copyright (c) 2017
      <a href="/">
        <strong>Restaurant Reviews</strong>
      </a> All Rights Reserved.
    </footer>
  </div>
</template>

<script>
import Breadcrumb from './components/Breadcrumb';

export default {
  name: 'App',
  components: {
    Breadcrumb
  }
};
</script>

<style lang="stylus">
@charset "utf-8"
/* CSS Document */
@import('~normalize.css')

*,
body,
html
  box-sizing: border-box

body,td,th,p
  font-family: 'Open Sans', Arial, Helvetica, sans-serif
  font-size: 10pt
  color: #333
  line-height: 1.5

body
  background-color: #fdfdfd
  margin: 0
  position:relative

ul, li
  font-family: 'Open Sans', Arial, Helvetica, sans-serif
  font-size: 10pt
  color: #333

a
  color: orange
  text-decoration: none
  padding: 1.5em

a:hover, a:focus
  color: #3397db
  text-decoration: none

a img
  border: none 0px #fff

h1, h2, h3, h4, h5, h6
  font-family: 'Open Sans', Arial, Helvetica, sans-serif
  margin: 0 0 20px

article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section
  display: block

img, embed, object, video
  max-width: 100%

#maincontent
  background-color: #f3f3f3
  min-height: 100%

.footer
  background-color: #444
  color: #e9e9e9
  font-size: 8pt
  letter-spacing: 1px
  padding: 25px
  text-align: center
  text-transform: uppercase

.footer a
  padding: 0px

nav
  width: 100%
  height: 80px
  background-color: #252831
  text-align:center
  display: flex
  justify-content: center
  align-items: center

nav h1
  margin: auto

nav h1 a
  color: #fff
  font-size: 14pt
  font-weight: 200
  letter-spacing: 10px
  text-transform: uppercase

.fixed__header
  position: fixed
  top: 0
  width: 100%
  z-index: 1000

.footer
  bottom: 0
  position: absolute
  width: 50%

.main__container
  display: flex
  flex-direction: row

@media only screen and (max-width: 767px)
  .main__container
    flex-direction: column

  .footer
    width: 100%

@media only screen and (max-width: 480px)
  .main__container
    flex-direction: column

  .footer
    width: 100%

.footer__full
  width: 100%
  position: relative
</style>
