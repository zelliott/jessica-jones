import Vue from 'vue'
import Router from 'vue-router'
import App from './app'
import { fromNow } from './filters'
import DefaultView from './views/default-view'
import ListingsView from './views/listings-view'
import ListingView from './views/listing-view'
import PostListingView from './views/post-listing-view'
import SignupView from './views/signup-view'
import LoginView from './views/login-view'

Vue.use(Router)

Vue.filter('fromNow', fromNow)

var router = new Router()

router.map({
  '/': {
    name: 'default',
    component: DefaultView
  },
  '/listings/:page': {
    name: 'listings',
    component: ListingsView
  },
  '/listing/:id': {
    name: 'listing',
    component: ListingView
  },
  '/post': {
    name: 'post',
    component: PostListingView
  },
  '/signup': {
    name: 'signup',
    component: SignupView
  },
  '/login': {
    name: 'login',
    component: LoginView
  }
})

router.redirect({
  '/listings': '/listings/1'
})

router.start(App, 'body')
