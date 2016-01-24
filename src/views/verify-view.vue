<template>
  <div class="verify-pane">
    <div>
      <div class="verify-title">
        Confirm email
      </div>
      <div class="verify-message">
        <div class="verify-message-header">
          <span class="oi oi-l" data-glyph="thumb-up" aria-hidden="true"></span>
          Thanks, your email is verified.
        </div>
        <div class="verify-message-body">
          Go ahead and login via the link below to check out the listings.
        </div>
      </div>
      <div class="verify-link">
        <a v-link="{ name: 'login' }" class="btn btn-blue-text">
          Login to the listings
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user-service'

export default {
  created () {
    UserService.verifyUser(this.$route.params.id)
  }
}
</script>
