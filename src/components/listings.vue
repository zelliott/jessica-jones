<template>
  <div class="listings max-width">
    <listing
      v-for="(id, listing) in listings"
      :id="id"
      :listing="listing">
    </listing>
  </div>
</template>

<script>
import Listing from './listing'
import ListingsStore from '../stores/listings-store'

export default {
  components: {
    Listing
  },

  created () {
    ListingsStore.on('listings-updated', this.update)
  },

  destroyed () {
    ListingsStore.removeListener('listings-updated', this.update)
  },

  data () {
    return {
      listings: ListingsStore.listings
    }
  },

  methods: {
    update () {
      this.listings = ListingsStore.listings
    }
  }
}

</script>
