<template>
  <div v-show="listing" class="listing-view view max-width">
    <div class="listing-timestamp">{{ listing.timestamp | fromNow }}</div>
    <div class="listing-title">{{ listing.title }}</div>
    <div class="listing-description">{{ listing.description }}</div>
    <!-- <button class="btn btn-charcoal btn-hover-red" @click="delete">
      <span class="oi oi-l" data-glyph="x" aria-hidden="true"></span>
      Delete
    </button> -->
  </div>
  <div v-show="noListing" class="listing-view view max-width">
    <div class="no-listing">
      Listing not found, it may have been deleted by its owner, or archived if over 6 months old.
    </div>
  </div>
</template>

<script>
import ListingsService from '../services/listings-service'

export default {
  data () {
    return {
      id: null,
      listing: null,
      noListing: false
    }
  },

  created () {
    this.id = this.$route.params.id

    ListingsService.get(this.id)
      .then((listing) => {
        this.listing = listing
      })
      .catch(() => {
        this.noListing = true
      })
  },

  methods: {
    delete (e) {
      e.preventDefault()

      ListingsService.delete(this.id).then(() => {
        this.$route.router.go({
          path: '/listings'
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
