<template>
  <div class="listings-view view max-width">
    <div class="listings">
      <listing
        v-for="(id, listing) in listings"
        :number="$index | formatListingNumber"
        :listing="listing">
      </listing>
    </div>

    <div class="listings-pagination clearfix">
      <a v-show="page > 1"
        v-link="{ name: 'listings', params: { page: page - 1 } }"
        class="btn btn-blue-text">
        Previous
      </a>
      <a v-link="{ name: 'listings', params: { page: page + 1 } }"
        class="btn btn-blue-text right">
        Next
      </a>
    </div>
  </div>
</template>

<script>
import Listing from '../components/listing'
import ListingsStore from '../stores/listings-store'

export default {
  components: {
    Listing
  },

  data () {
    return {
      page: 1,
      listings: []
    }
  },

  created () {
    ListingsStore.addChangeListener(this.onListingsChange)
  },

  destroyed () {
    ListingsStore.removeChangeListener(this.onListingsChange)
  },

  route: {
    data ({ to }) {
      return {
        page: +to.params.page,
        listings: ListingsStore.listingsByPage(+to.params.page)
      }
    }
  },

  methods: {
    onListingsChange () {
      this.listings = ListingsStore.listingsByPage(this.page)
    }
  },

  filters: {
    formatListingNumber (i) {
      return (this.page - 1) * ListingsStore.listingsPerPage + i + 1
    }
  }
}
</script>
