import $ from 'jquery'

class EmailService {

  sendConfirmation (id, to) {
    return new Promise((res, rej) => {

      $.ajax({
        url: '/api/email',
        type: 'POST',
        dataType: 'json',
        data: { id, to },
        success: (data) => {
          res(data)
        },
        error: (xhr, status, error) => {
          rej(error)
        }
      })
    })
  }
}

export default new EmailService()
