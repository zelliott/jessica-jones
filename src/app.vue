<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/navbar'
import './styles/main.scss'

export default {
  components: {
    Navbar
  },
  replace: false
}
</script>
