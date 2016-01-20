import Vue from 'vue'
import Router from 'vue-router'
import App from './app'
import { fromNow } from './filters'
import DefaultView from './views/default-view'
import ListingsView from './views/listings-view'
import ListingView from './views/listing-view'
import PostListingView from './views/post-listing-view'

Vue.use(Router)

Vue.filter('fromNow', fromNow)

var router = new Router()

router.map({
  '/': {
    name: 'default',
    component: DefaultView
  },
  '/listings': {
    name: 'listings',
    component: ListingsView,
    subRoutes: {
      '/page/:page': {
        component: ListingsView
      },
      '/listings/:listingId': {
        name: 'listing',
        component: ListingView
      }
    }
  },
  '/post': {
    name: 'post',
    component: PostListingView
  }
})

router.start(App, 'body')
