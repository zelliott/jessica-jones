<template>
  <div class="listing">
    <div>
      <a class="listing-title" v-link="{ name: 'listing', params: { listingId: id } }">{{ listing.title }}</a>
    </div>
    <div class="listing-timestamp">{{ listing.timestamp }}</div>
  </div>
</template>

<script>
export default {
  props: ['listing', 'id']
}
</script>
