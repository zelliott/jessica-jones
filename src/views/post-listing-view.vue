<template>
  <navbar></navbar>
  <div class="post-listing-view view max-width">
    <div class="form-title">Post a listing</div>
    <div class="form-description">
      Fill out the form below to post a job listing to Penn students.
      <br>
      <br>
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
      <div class="checkbox-form-group">
        <input type="checkbox" id="anonymous" v-model="anonymous">
        <label for="anonymous">
          <b>Post anonymously</b>
          Your handle (you@seas) won't appear next to your post, but don't forget to
          add an email or phone number.
        </label>
      </div>
      <button class="btn btn-green btn-large" type="submit" @click="post">
        <span v-show="!posting" class="oi oi-l" data-glyph="pencil" aria-hidden="true"></span>
        <div v-show="posting" class="loader"></div>
        Post this listing
      </button>
    </form>
  </div>
</template>

<script>
import Navbar from '../components/navbar'
import ListingsService from '../services/listings-service'
import _ from 'lodash'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      title: '',
      description: '',
      anonymous: false,
      titleValid: true,
      descriptionValid: true,
      dbError: false,
      posting: false
    }
  },

  methods: {
    post (e) {
      e.preventDefault()

      this.titleValid = _.inRange(this.title.length, 1, 140)
      this.descriptionValid = _.inRange(this.description.length, 1, 500)

      if (this.titleValid && this.descriptionValid) {

        this.$set('posting', true)

        ListingsService.post(
          this.title,
          this.description,
          this.anonymous
        ).then((id) => {
          this.$set('posting', false)
          this.$route.router.go({
            name: 'listing',
            params: {
              id: id
            }
          })
        }).catch((error) => {
          console.log(error)
          this.$set('dbError', true)
          this.$set('posting', false)
        })
      }
    }
  }
}
</script>
