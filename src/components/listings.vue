<template>
  <div>
    <listing
      v-for="listing in listings"
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
      listings: []
    }
  },

  methods: {
    update () {
      this.listings = ListingsStore.listings
    }
  }
}

</script>
