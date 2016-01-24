import mandrill from 'mandrill-api/mandrill'

const API_KEY = '2_DhGpyFJH7YF9ETuCpiKw'
const BASE_URL = 'https://powerful-bayou-31061.herokuapp.com/verify/'

class EmailService {

  constructor () {
    this.client = new mandrill.Mandrill(API_KEY)
  }

  sendConfirmation (id, email) {

    let message = {
      html: '<p>Thanks for joining this listings network.  Click on the below link to verify your account.</p><a href=' + BASE_URL + id + '>' + BASE_URL + id + '</a>',
      from_email: 'noreply@jessica-jones.com',
      to: [{
        email: email,
        type: 'to'
      }]
    }

    this.client.messages.send({
      message: message,
      async: false
    }, (res) => {
      console.log(res)
    }, (error) => {
      console.log(error)
    })
  }
}

export default new EmailService()
