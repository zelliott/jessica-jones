<template>
  <navbar></navbar>
  <div v-show="listing" class="listing-view view max-width">
    <div class="listing-info">
      {{ listing.timestamp | fromNow }} by
      <a v-show="!listing.anonymous" href="mailto:{{ listing.email }}@upenn.edu">{{ listing.email }}</a>
      <span v-show="listing.anonymous">anonymous</span>
    </div>
    <div v-show="!editing" class="listing-title">{{ listing.title }}</div>
    <div v-show="!editing" class="listing-description">{{ listing.description }}</div>

    <div v-show="editing" class="listing-edit-form">

      <div v-show="dbError" class="form-warning">
        <div>Database error.  Make sure both fields are completed.</div>
      </div>

      <div class="form-group">
        <input
          type="text"
          v-model="listing.title"
          placeholder="Title"/>
        <label for="title">Title *</label>
      </div>
      <div class="form-group">
        <textarea
          v-model="listing.description"
          placeholder="Description">
        </textarea>
        <label for="description">Description *</label>
      </div>
      <div class="checkbox-form-group">
        <input type="checkbox" id="anonymous" v-model="listing.anonymous">
        <label for="anonymous">
          <b>Post anonymously</b>
          Your handle (you@seas) won't appear next to your post, but don't forget to
          add an email or phone number.
        </label>
      </div>
    </div>

    <div class="listing-actions clearfix">
      <button v-show="!listing.reported" class="btn btn-small btn-blue-text left" @click="report">
        <span class="oi oi-l" data-glyph="flag" aria-hidden="true"></span>
        Report as spam
      </button>
      <button v-show="listing.reported" class="btn btn-small btn-green-text left" @click="report">
        <span class="oi oi-l" data-glyph="check" aria-hidden="true"></span>
        Reported
      </button>

      <div v-show="isAuthor">
        <button class="btn btn-small btn-red-text right" @click="delete">
          <span class="oi oi-l" data-glyph="x" aria-hidden="true"></span>
          Delete
        </button>
        <button v-show="!editing" class="btn btn-small btn-blue-text right" @click="edit">
          <span class="oi oi-l" data-glyph="pencil" aria-hidden="true"></span>
          Edit
        </button>
        <button v-show="editing" class="btn btn-small btn-blue-text right" @click="update">
          <span class="oi oi-l" data-glyph="pencil" aria-hidden="true"></span>
          Save edits
        </button>
      </div>
    </div>
  </div>
  <div v-show="noListing" class="listing-view view max-width">
    <div class="no-listing">
      Listing not found, it may have been deleted by its owner, or archived if over 6 months old.
    </div>
  </div>
</template>

<script>
import Navbar from '../components/navbar'
import ListingsService from '../services/listings-service'
import UserStore from '../stores/user-store'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      id: null,
      listing: null,
      noListing: false,
      editing: false,
      dbError: false,
      isAuthor: false
    }
  },

  created () {
    this.$set('id', this.$route.params.id)

    ListingsService.get(this.id)
      .then((listing) => {
        this.$set('listing', listing)
        this.$set('isAuthor', listing.email === UserStore.email)
      })
      .catch(() => {
        this.$set('noListing', true)
      })
  },

  methods: {
    delete (e) {
      e.preventDefault()

      ListingsService.delete(this.id).then(() => {
        this.$route.router.go({
          path: '/listings'
        })
      }).catch((error) => {
        console.log(error)
      })
    },

    edit () {
      this.$set('editing', true)
    },

    update (e) {
      e.preventDefault()

      ListingsService.update(this.id, this.listing).then(() => {
        this.$set('editing', false)
        this.$set('dbError', false)
      }).catch((error) => {
        this.$set('dbError', true)
        console.log(error)
      })
    },

    report (e) {

      ListingsService.update(this.id, { reported: !this.listing.reported }).then(() => {
        this.$set('listing.reported', !this.listing.reported)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
