<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/navbar'

export default {
  components: {
    Navbar
  },
  replace: false
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
