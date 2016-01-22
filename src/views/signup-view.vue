<template>
  <div>
    <div class="signup-form">
      <form>
        <div class="form-title">Sign up</div>

        <div v-show="dbError" class="form-warning">
          <div>
            Database error.  Use a upenn.edu email and complete both fields.
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
        <button class="btn btn-green" type="submit" @click="signup">
          <span class="oi oi-l" data-glyph="person" aria-hidden="true"></span>
          Sign up
        </button>
        <div class="form-bottom-link">
          <a v-link="{ name: 'login' }" class="btn btn-blue-text">
            Login
          </a>
        </div>
      </form>
    </div>
    <div class="signup-info">

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
    signup (e) {
      e.preventDefault()

      UserService.signup({
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
