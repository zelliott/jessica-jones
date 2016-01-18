// import Firebase from 'firebase'
import { EventEmitter } from 'events'

// const api = new Firebase('https://jessica-jones.firebaseio.com')

class ListingsStore extends EventEmitter {

  constructor () {
    super()
    this._listings = []
  }

  get listings () {
    return this._listings
  }
}

export default new ListingsStore()
