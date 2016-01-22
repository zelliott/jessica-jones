<template>
  <login-modal :show-login="showLogin"></login-modal>
  <div class="navbar">
    <div class="max-width clearfix">
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
      <div class="navbar-right">
        <div class="navbar-text">
          {{ email }}
        </div>
        <a @click="logout">
          Logout
        </a>
        <!-- <a @click="login">
          <span class="oi oi-l" data-glyph="key" aria-hidden="true"></span>
          Login
        </a> -->
      </div>
    </div>
  </div>
</template>

<script>
import LoginModal from './modals/login.vue'
import UserStore from '../stores/user-store'
import UserService from '../services/user-service'

export default {
  components: {
    LoginModal
  },

  data () {
    return {
      showLogin: false,
      email: UserStore.email
    }
  },

  methods: {
    login () {
      this.$set('showLogin', true)
    },

    logout (e) {
      e.preventDefault()

      UserService.logout().then(() => {

        UserStore.logout()
        this.$route.router.go({
          name: 'login'
        })

      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
