import { EventEmitter } from 'events'
import db from '../../server/config/db.js'

const CHANGE = 'change'

class UserStore extends EventEmitter {

  constructor () {
    super()
    this._uid = null
    this._email = null

    db.onAuth((data) => {
      if (data) {
        this._uid = data.uid
        this._email = data.password.email.slice(0, -10)
      } else {
        this.logout()
      }
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

  get uid () {
    return this._uid
  }

  get email () {
    return this._email
  }

  isLoggedIn () {
    return !!this._uid
  }

  logout () {
    this._uid = null
    this._email = null
  }
}

export default new UserStore()
