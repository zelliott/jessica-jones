<template>
  <div class="post-listing-view view max-width">
    <div class="form-title">Post a listing</div>
    <div class="form-description">
      Here is a description about posting a listing.  It contains
      lots of useful information and is helpful to read.
    </div>
    <form>
      <div class="form-group">
        <input id="title" type="text" v-model="title" placeholder="Title"></textarea>
        <label for="title">Title</label>
      </div>
      <div class="form-group">
        <textarea id="description" v-model="description" placeholder="Description"></textarea>
        <label for="description">Description</label>
      </div>
      <button class="btn btn-green" type="submit" @click="post">Post</button>
    </form>
  </div>
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
