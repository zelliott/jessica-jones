import db from '../../server/config/db.js'
import moment from 'moment'
import ListingsStore from '../stores/listings-store'
import UserStore from '../stores/user-store'
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

  post (title, description, anonymous) {
    return new Promise((res, rej) => {
      let id = db.child('listings').push({
        title: title,
        description: description,
        anonymous: anonymous,
        timestamp: moment().unix() * 1000,
        email: UserStore.email
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
