import { EventEmitter } from 'events'
import db from '../../server/db.js'
import _ from 'lodash'

class ListingsStore extends EventEmitter {

  constructor () {
    super()
    this._listings = {}

    db.on('value', (snapshot) => {

      if (_.isNull(snapshot.val())) {
        return
      }

      this._listings = snapshot.val().listings
      this.emit('listings-updated')
    })
  }

  get listings () {
    return this._listings
  }

  getListing (id) {

    return new Promise((res, rej) => {
      if (this._listings[id]) {
        res(this._listings[id])
      }

      db.child('listings/' + id).once('value', (snapshot) => {
        res(snapshot.val())
      }, rej)
    })
  }
}

export default new ListingsStore()
