import db from '../../server/db.js'
import moment from 'moment'
import ListingsStore from '../stores/listings-store'
import _ from 'lodash'

class ListingsService {

  get (id) {
    return new Promise((res, rej) => {
      if (ListingsStore.listings[id]) {
        res(ListingsStore.listings[id])
      }

      db.child('listings/' + id).once('value', (snapshot) => {
        if (_.isNull(snapshot.val())) {
          rej()
        } else {
          res(snapshot.val())
        }
      })
    })
  }

  post (title, description) {
    return new Promise((res, rej) => {
      let id = db.child('listings').push({
        title: title,
        description: description,
        timestamp: moment().unix() * 1000
      }, (error) => {
        if (error) {
          rej(error)
        } else {
          res(id.key())
        }
      })
    })
  }

  update (id, listing) {
    return new Promise((res, rej) => {
      db.child('listings/' + id).update(listing, (error) => {
        if (error) {
          rej(error)
        } else {
          res()
        }
      })
    })
  }

  delete (id) {
    return new Promise((res, rej) => {
      db.child('listings/' + id).remove((error) => {
        if (error) {
          rej(error)
        } else {
          res()
        }
      })
    })
  }
}

export default new ListingsService()
