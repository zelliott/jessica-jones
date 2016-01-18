<template>
  <div class="listing">
    <a v-link="{ name: 'listing', params: { listingId: listing.id } }">{{ listing.title }}</a>
    <div>
      {{ listing.description }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['listing']
}
</script>

<style>
.listing {
  padding: 20px;
}
</style>
