<template>
  <div>
    <div class="login-form">
      <form>
        <div class="form-title">Login</div>

        <div v-show="dbError" class="form-warning">
          <div>
            Database error.
          </div>
        </div>

        <div class="form-group">
          <input
            id="title"
            type="text"
            v-model="email"
            placeholder="Email"/>
          <label for="title">Email</label>
          <div class="form-input-info">Must be a <b>upenn.edu</b> email address</div>
        </div>
        <div class="form-group">
          <input
            id="title"
            type="password"
            v-model="password"
            placeholder="Password"/>
          <label for="description">Password</label>
        </div>
        <button class="btn btn-green" type="submit" @click="login">
          <span class="oi oi-l" data-glyph="key" aria-hidden="true"></span>
          Login
        </button>
        <div class="form-bottom-link">
          <a v-link="{ name: 'signup' }" class="btn btn-blue-text">
            Sign up
          </a>
        </div>
      </form>
    </div>
    <div class="login-info">

    </div>
  </div>
</template>

<script>
import UserService from '../services/user-service'

export default {
  data () {
    return {
      email: '',
      password: '',
      dbError: false
    }
  },

  methods: {
    login (e) {
      e.preventDefault()

      UserService.login({
        email: this.email,
        password: this.password
      }).then((user) => {
        this.$route.router.go({
          path: '/listings'
        })
      }).catch((error) => {
        console.log(error)
        this.$set('dbError', true)
      })
    }
  }
}
</script>
