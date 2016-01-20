import { EventEmitter } from 'events'
import db from '../../server/db.js'
import _ from 'lodash'

const LISTINGS_PER_PAGE = 5

class ListingsStore extends EventEmitter {

  constructor () {
    super()
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
    })
  }

  get listings () {
    return this._listings
  }

  listingsByPage (page = 1) {
    let start = (LISTINGS_PER_PAGE * (page - 1))
    let end = (page * LISTINGS_PER_PAGE) - 1

    return this._listings.slice(start, end)
  }
}

export default new ListingsStore()
