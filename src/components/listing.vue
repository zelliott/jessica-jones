<template>
  <div class="listing">
    <div class="listing-number">
      {{ number + 1 }}.
    </div>
    <div class="listing-content">
      <div>
        <a class="listing-title ellipsis" v-link="{ name: 'listing', params: { listingId: listing.id } }">{{ listing.title }}</a>
      </div>
      <div class="listing-timestamp">{{ listing.timestamp | fromNow }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['listing', 'id', 'number']
}
</script>
