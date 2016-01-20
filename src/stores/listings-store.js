import { EventEmitter } from 'events'
import db from '../../server/db.js'
import _ from 'lodash'

const CHANGE = 'change'

class ListingsStore extends EventEmitter {

  constructor () {
    super()
    this._listingsPerPage = 2
    this._listingsCount = 0
    this._listings = []

    db.child('listings').on('value', (snapshot) => {

      if (_.isNull(snapshot.val())) {
        this._listings = []
        return
      }

      this._listings = _
        .chain(snapshot.val())
        .map((listing, id) => {
          listing.id = id
          return listing
        })
        .reverse()
        .value()

      this._listingsCount = this._listings.length

      this.emitChange()
    })

  }

  emitChange () {
    this.emit(CHANGE)
  }

  addChangeListener (cb) {
    this.on(CHANGE, cb)
  }

  removeChangeListener (cb) {
    this.removeListener(CHANGE, cb)
  }

  listingsByPage (page = 1) {
    let start = (this._listingsPerPage * (page - 1))
    let end = (page * this._listingsPerPage)

    return this._listings.slice(start, end)
  }

  get listings () {
    return this._listings
  }

  get listingsCount () {
    return this._listingsCount
  }

  get listingsPerPage () {
    return this._listingsPerPage
  }
}

export default new ListingsStore()
