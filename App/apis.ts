import axios from 'axios';

const apiUrl = 'https://cool-worlds-reply-172-116-44-177.loca.lt';

class Api {
  static async getEventsApi(limit = 15) {
    try {
      const response = await axios.get(`${apiUrl}/events`);
      return response.data;
    } catch (error) {
      console.log('Get Events Error: ', error.message);
      return error;
    }
  }

  static async getUnapprovedEventsApi(passphrase) {
    try {
      const response = await axios.get(
        `${apiUrl}/events/unapproved/?passphrase=${passphrase}`
      );
      return response.data;
    } catch (error) {
      console.log('Get Unapproved Events Error: ', error.message);
      return error;
    }
  }

  static async authDev(passphrase) {
    try {
      const response = await axios.get(
        `${apiUrl}/events/authenticate/?passphrase=${passphrase}`
      );
      return response;
    } catch (error) {
      console.log('Auth Dev Error: ', error.message);
      return error;
    }
  }

  static async postEventApi(event) {
    try {
      const response = await axios.post(`${apiUrl}/events`, event);
      return response.data;
    } catch (error) {
      console.log('Post Event Error: ', error.message);
      return new Error(error);
    }
  }

  static async sendFeedback(feedback) {
    try {
      const response = await axios.post(`${apiUrl}/events/feedback`, {
        body: {
          feedback,
        },
      });
      return response;
    } catch (error) {
      console.log('Send Feedback Error: ', error.message);
      return error;
    }
  }
}

export default Api;
