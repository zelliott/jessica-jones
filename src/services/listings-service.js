import db from '../../server/db.js'
import moment from 'moment'

class ListingsService {

  post (title, description) {
    db.child('listings').push({
      title: title,
      description: description,
      timestamp: moment().format('MMMM Do, YYYY')
    }, (error) => {
      if (error) {
        console.log('Post failed')
      } else {
        console.log('Post succeeded')
      }
    })
  }

  delete (id) {
    db.child('listings/' + id).remove((error) => {
      if (error) {
        console.log('Delete failed')
      } else {
        console.log('Delete success')
      }
    })
  }
}

export default new ListingsService()
