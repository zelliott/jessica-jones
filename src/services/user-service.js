import db from '../../server/db.js'
import Errors from '../constants/error-constants'

class UserService {

  signup (user) {
    return new Promise((res, rej) => {

      if (user.email.slice(-9) !== 'upenn.edu') {
        rej('Email is not upenn.edu')
        return
      }

      db.createUser(user, (error, data) => {
        if (error) {
          rej(Errors[error.code])
        } else {

          // db.resetPassword({
          //   email: user.email
          // }, (error) => {
          //   if (error) {
          //     rej(error)
          //   } else {
          //     res(data)
          //   }
          // })

          db.child('users/' + data.uid).set({
            confirmed: false
          }, (error) => {
            if (error) {
              rej(Errors[error.code])
            } else {
              res()
            }
          })
        }
      })
    })
  }

  login (user) {
    return new Promise((res, rej) => {
      db.authWithPassword(user, (error, data) => {
        if (error) {
          rej(Errors[error.code])
        } else {
          res(data)
        }
      })
    })
  }

  logout () {
    return new Promise((res, rej) => {
      db.unauth()
      res()
    })
  }
}

export default new UserService()
