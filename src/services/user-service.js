import db from '../../server/config/db.js'
import Errors from '../constants/error-constants'
import EmailService from './email-service'

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

          db.child('users/' + data.uid).set({
            confirmed: false
          }, (error) => {
            if (error) {
              rej(Errors[error.code])
            } else {
              EmailService.sendConfirmation(data.uid, user.email).then((data) => {
                res(data)
              }).catch((error) => {
                rej(error)
              })
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

          db.child('users/' + data.uid).once('value', (verified) => {
            if (!verified.val().confirmed) {
              rej('Email has not been confirmed, click on the emailed confirmation link.')
            } else {
              res(data)
            }
          }, (error) => {
            rej(error)
          })
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

  verifyUser (id) {
    return new Promise((res, rej) => {
      db.child('users/' + id).set({
        confirmed: true
      }, (error) => {
        if (error) {
          rej(Errors[error.code])
        } else {
          res()
        }
      })
    })
  }
}

export default new UserService()
