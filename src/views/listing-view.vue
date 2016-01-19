<template>
  <div v-show="listing" class="listing-view view max-width">
    <div class="listing-title">{{ listing.title }}</div>
    <div class="listing-description">{{ listing.description }}</div>
    <div class="listing-timestamp">{{ listing.timestamp }}</div>
    <button class="btn btn-charcoal btn-hover-red" @click="delete">Delete</button>
  </div>
</template>

<script>
import ListingsStore from '../stores/listings-store'
import ListingsService from '../services/listings-service'

export default {
  data () {
    return {
      id: null,
      listing: {}
    }
  },

  route: {
    data ({ to }) {
      this.id = to.params.listingId
      return ListingsStore.getListing(to.params.listingId).then((listing) => ({
        listing: listing
      }))
    }
  },

  methods: {
    delete (e) {
      e.preventDefault()

      ListingsService.delete(this.id)
    }
  }
}
</script>
