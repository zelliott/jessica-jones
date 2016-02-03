<template>
  <navbar></navbar>
  <div class="listings-view view max-width">

    <!-- <div class="listings-filters clearfix">
      <div class="listings-filter">
        <input type="checkbox" id="my-listings" v-model="myListings"/>
        <label for="my-listings">Show only my listings</label>
      </div>
    </div> -->

    <div class="listings-loading" v-show="loading">
      <div class="loader"></div>
    </div>

    <div class="no-listings" v-show="!loading && listingsCount === 0">
      No listings.  Post one!
    </div>

    <div class="listings">
      <listing
        v-for="(id, listing) in listings"
        :number="$index | formatListingNumber"
        :listing="listing">
      </listing>
    </div>

    <div class="listings-pagination clearfix" v-show="!loading && listingsCount > listingsPerPage">
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
import Navbar from '../components/navbar'
import Listing from '../components/listing'
import ListingsStore from '../stores/listings-store'

export default {
  components: {
    Navbar,
    Listing
  },

  data () {
    return {
      page: 1,
      listings: [],
      listingsCount: ListingsStore.listingsCount,
      listingsPerPage: ListingsStore.listingsPerPage,
      loading: ListingsStore.loading,
      myListings: false
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
        loading: ListingsStore.loading
      }
    }
  },

  methods: {
    onListingsChange () {
      this.listings = ListingsStore.listingsByPage(this.page)
      this.listingsCount = ListingsStore.listingsCount
      this.loading = ListingsStore.loading
    }
  },

  filters: {
    formatListingNumber (i) {
      return (this.page - 1) * this.listingsPerPage + i + 1
    }
  }
}
</script>
