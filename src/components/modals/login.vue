<template>
  <div v-show="showLogin">
    <div class="modal login-modal">
      <span class="oi oi-l modal-close" data-glyph="x" aria-hidden="true" @click="hide"></span>
      <form>
        <div class="form-title">Login</div>
        <input
          id="title"
          type="text"
          v-model="email"
          placeholder="Email"/>
        <input
          id="title"
          type="password"
          v-model="password"
          placeholder="Password"/>
        <button class="btn btn-green right" type="submit" @click="login">
          <span class="oi oi-l" data-glyph="key" aria-hidden="true"></span>
          Login
        </button>
      </form>
    </div>
    <div class="modal-overlay" @click="hide"></div>
  </div>
</template>

<script>
import UserService from '../../services/user-service'

export default {
  props: ['showLogin'],

  data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    hide () {
      this.$parent.$set('showLogin', false)
    },

    login () {
      UserService.login({
        email: this.email,
        password: this.password
      }).then(() => {
        this.$parent.$set('showLogin', false)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
