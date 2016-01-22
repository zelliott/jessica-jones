<template>
  <div v-show="listing" class="listing-view view max-width">
    <div class="listing-timestamp">{{ listing.timestamp | fromNow }}</div>
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
    </div>

    <div class="listing-actions clearfix">
      <button v-show="!listing.reported" class="btn btn-small btn-blue-text left" @click="report">
        <span class="oi oi-l" data-glyph="flag" aria-hidden="true"></span>
        Report
      </button>
      <button v-show="listing.reported" class="btn btn-small btn-green-text btn-disabled left">
        <span class="oi oi-l" data-glyph="check" aria-hidden="true"></span>
        Reported
      </button>

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
  <div v-show="noListing" class="listing-view view max-width">
    <div class="no-listing">
      Listing not found, it may have been deleted by its owner, or archived if over 6 months old.
    </div>
  </div>
</template>

<script>
import ListingsService from '../services/listings-service'

export default {
  data () {
    return {
      id: null,
      listing: null,
      noListing: false,
      editing: false,
      dbError: false
    }
  },

  created () {
    this.$set('id', this.$route.params.id)

    ListingsService.get(this.id)
      .then((listing) => {
        this.$set('listing', listing)
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
      ListingsService.update(this.id, { reported: 'true' }).then(() => {
        this.$set('listing.reported', true)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
