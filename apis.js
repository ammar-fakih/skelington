import axios from 'axios';

const apiUrl = 'https://ready-toes-fry-172-116-44-177.loca.lt';

class Api {
  static async getEventsApi(limit = 15) {
    try {
      // const response = await axios.get(`http://192.168.56.1:3001/events`);
      const response = await axios.get(`${apiUrl}/events`);
      return response.data;
    } catch (error) {
      console.log("Get Events Error: ", error.message);
      return error;
    }
  }
}

export default Api;
