<template>
  <div class="listings-view view max-width">

    <div class="listings-loading" v-show="loading">
      Loading...
    </div>

    <div class="no-listings" v-show="!loading && listings.length === 0">
      No listings
    </div>

    <div class="listings">
      <listing
        v-for="(id, listing) in listings"
        :number="$index | formatListingNumber"
        :listing="listing">
      </listing>
    </div>

    <div class="listings-pagination clearfix" v-show="!loading && listings.length !== 0">
      <a v-show="page > 1"
        v-link="{ name: 'listings', params: { page: page - 1 } }"
        class="btn btn-blue-text">
        Previous
      </a>
      <a v-link="{ name: 'listings', params: { page: page + 1 } }"
        class="btn btn-blue-text right"
        v-show="listingsCount > this.listingsPerPage * page">
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
      listings: [],
      listingsCount: 0,
      listingsPerPage: ListingsStore.listingsPerPage,
      loading: true
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
        listings: ListingsStore.listingsByPage(+to.params.page),
        listingsCount: ListingsStore.listingsCount,
        loading: false
      }
    }
  },

  methods: {
    onListingsChange () {
      this.listings = ListingsStore.listingsByPage(this.page)
      this.listingsCount = ListingsStore.listingsCount
      this.loading = false
    }
  },

  filters: {
    formatListingNumber (i) {
      return (this.page - 1) * this.listingsPerPage + i + 1
    }
  }
}
</script>
