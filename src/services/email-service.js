import postmark from 'postmark'

// const BASE_URL = 'https://powerful-bayou-31061.herokuapp.com/verify/'

class EmailService {

  constructor () {
    this.postmark = postmark(process.env.POSTMARK_API_TOKEN)
  }

  sendConfirmation (id, to) {

    // let message = '<p>Thanks for joining this listings network.  Click on the below link to verify your account.</p><a href=\"' + BASE_URL + id + '\">' + BASE_URL + id + '</a>'

    postmark.send({
      'From': 'leonard@bigbangtheory.com',
      'To': 'sheldon@bigbangtheory.com',
      'Subject': 'Hello from Postmark',
      'TextBody': 'Hello!',
      'Tag': 'big-bang'
    }, (error) => {

      if (error) {
        console.error('Unable to send via postmark: ' + error.message)
        return
      }

      console.info('Sent to postmark for delivery')
    })
  }
}

export default new EmailService()
