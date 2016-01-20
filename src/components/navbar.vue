<template>
  <div class="navbar">
    <div class="max-width">
      <div class="navbar-left">
        <a v-link="{ path: '/listings' }">
          <span class="oi oi-l" data-glyph="list-rich" aria-hidden="true"></span>
          Listings
        </a>
        <a v-link="{ path: '/post' }">
          <span class="oi oi-l" data-glyph="pencil" aria-hidden="true"></span>
          Post a listing
        </a>
      </div>
    </div>
  </div>
</template>
