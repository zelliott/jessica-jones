<template>
  <div class="listings">
    <listing
      v-for="(id, listing) in listings"
      :number="$index"
      :listing="listing">
    </listing>
  </div>
  <button>
</template>

<script>

// TODO:
//  - Figure out / finalize routing on main.js
//  - Figure out why routing hooks were not working here
//  - Finalize listings data flow here
//  - Implement pagination

import Listing from './listing'
import ListingsStore from '../stores/listings-store'

export default {
  components: {
    Listing
  },

  data () {
    return {
      listings: []
    }
  },

  created () {

  }
}

</script>
