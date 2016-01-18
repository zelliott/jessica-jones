<template>
  Post a listing
  <form>
    <input type="text" v-model="title" placeholder="Title"/>
    <input type="text" v-model="description" placeholder="Description"/>
    <button type="submit" @click="post">Post</button>
  </form>
</template>

<script>

import ListingsService from '../services/listings-service'

export default {
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    post (e) {
      e.preventDefault()
      console.log(this.title, this.description)

      ListingsService.post(
        this.title,
        this.description
      )
    }
  }
}
</script>
