<template>
  <div class="signup-form auth-form" v-show="!signupSuccess">
    <form>
      <div class="form-title">
        <img src="../assets/images/shield.png"/>
        Sign up
      </div>

      <div v-show="dbError" class="form-warning">
        <div>
          {{ errorMessage }}
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
  <div v-show="signupSuccess" class="signup-success">
    <div>
      <div class="success-title">
        <img src="../assets/images/shield.png"/>
        Sign up
      </div>
      <div class="success-message">
        <div class="success-message-header">
          <span class="oi oi-l" data-glyph="check" aria-hidden="true"></span>
          You're all set.
        </div>
        <div class="success-message-body">
          Check <b>{{ email }}</b> for a confirmation link to verify your email.
        </div>
      </div>
      <div class="success-link">
        <a v-link="{ name: 'login' }" class="btn btn-blue-text">
          Go to login
        </a>
      </div>
    </div>
  </div>
  <div class="signup-info auth-info">
    <img src="../assets/images/home_2.png"/>
    <div class="call-to-action">Post any job or project to Penn students looking for work.</div>
    <div class="attribution">
      art by
      <a target="_blank" href="https://thenounproject.com/Bloomua/">Anatolli Babi</a>
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
      dbError: false,
      errorMessage: '',
      signupSuccess: false
    }
  },

  methods: {
    signup (e) {
      e.preventDefault()

      UserService.signup({
        email: this.email,
        password: this.password
      }).then((user) => {
        this.$set('signupSuccess', true)
      }).catch((error) => {
        this.$set('dbError', true)
        this.$set('errorMessage', error)
      })
    }
  }
}
</script>
