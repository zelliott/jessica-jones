<template>
  <div class="post-listing-view view max-width">
    <div class="form-title">Post a listing</div>
    <div class="form-description">
      Fill out the form below to post a job listing to Penn students.
      <br \>
      <br \>
      Some tips when posting a job listing:

      <ul>
       <li>Keep it short, sweet, and to the point.</li>
       <li>Clearly describe a summary of the job / project.</li>
       <li>Include some contact information (email, phone, or both).</li>
      </ul>
    </div>
    <form>

      <div v-show="!titleValid || !descriptionValid" class="form-warning">
        <div v-show="!titleValid">Title length must be between 1 and 140 characters.</div>
        <div v-show="!descriptionValid">Description length must be between 1 and 500 characters.</div>
        <div v-show="dbError">Database error.  Make sure both fields are completed.</div>
      </div>

      <div class="form-group">
        <input
          id="title"
          type="text"
          v-model="title"
          placeholder="Title"/>
        <label for="title">Title *</label>
      </div>
      <div class="form-group">
        <textarea
          id="description"
          v-model="description"
          placeholder="Description">
        </textarea>
        <label for="description">Description *</label>
      </div>
      <button class="btn btn-green" type="submit" @click="post">
        <span class="oi oi-l" data-glyph="pencil" aria-hidden="true"></span>
        Post
      </button>
    </form>
  </div>
</template>

<script>

import ListingsService from '../services/listings-service'
import _ from 'lodash'

export default {
  data () {
    return {
      title: '',
      description: '',
      titleValid: true,
      descriptionValid: true,
      dbError: false
    }
  },
  methods: {
    post (e) {
      e.preventDefault()

      this.titleValid = _.inRange(this.title.length, 1, 140)
      this.descriptionValid = _.inRange(this.description.length, 1, 500)

      if (this.titleValid && this.descriptionValid) {

        ListingsService.post(
          this.title,
          this.description
        ).then((id) => {
          this.$route.router.go({
            name: 'listing',
            params: {
              id: id
            }
          })
        }).catch((error) => {
          console.log(error)
          this.dbError = true
        })
      }
    }
  }
}
</script>
