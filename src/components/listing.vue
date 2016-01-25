<template>
  <div class="listing">
    <div class="listing-number">
      {{ number }}.
    </div>
    <div class="listing-content">
      <div>
        <a class="listing-title ellipsis" v-link="{ name: 'listing', params: { id: listing.id } }">{{ listing.title }}</a>
      </div>
      <div class="listing-email">
        <a v-show="!listing.anonymous" href="mailto:{{ listing.email }}@upenn.edu">
          {{ listing.email }}
        </a>
        <span v-show="listing.anonymous">anonymous</span>
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
