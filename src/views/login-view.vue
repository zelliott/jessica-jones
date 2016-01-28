<template>
  <div class="login-form auth-form">
    <form>
      <div class="form-title">
        <img src="../assets/images/shield.png"/>
        Login
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
  <div class="login-info auth-info">
    <img v-show="tip.index === 0" src="../assets/images/login/login_0.png"/>
    <img v-show="tip.index === 1" src="../assets/images/login/login_1.png"/>
    <img v-show="tip.index === 2" src="../assets/images/login/login_2.png"/>
    <img v-show="tip.index === 3" src="../assets/images/login/login_3.png"/>
    <img v-show="tip.index === 4" src="../assets/images/login/login_4.png"/>
    <div class="info-block">{{ tip.text }}</div>
    <div class="info-block">
      <span class="oi refresh" @click="nextTip" data-glyph="reload" aria-hidden="true"></span>
    </div>
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
      tips: [
        {
          index: 0,
          text: 'Build a portfolio to demonstrate previous successful projects.'
        },
        {
          index: 1,
          text: 'Meet in person to get to know one another and to define the project.'
        },
        {
          index: 2,
          text: 'Keep track of when you\'re working and what you\'ve been working on.'
        },
        {
          index: 3,
          text: 'Get a contract in writing to keep everyone on the same page.'
        },
        {
          index: 4,
          text: 'Stay in touch to keep your client updated with your progress.'
        }
      ]
    }
  },

  created () {
    this.$set('tipIndex', Math.floor(Math.random() * this.tips.length))
    this.$set('tip', this.tips[this.tipIndex])
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
        this.$set('dbError', true)
        this.$set('errorMessage', error)
      })
    },

    nextTip () {
      this.$set('tipIndex', (this.tipIndex + 1) % this.tips.length)
      this.$set('tip', this.tips[this.tipIndex])
    }
  }
}
</script>
