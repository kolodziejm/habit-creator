import axios from 'axios';

// Create instance, set it to localhost, after api deploy set to the actual domain
const instance = axios.create({
  baseURL: 'https://habit-creator.herokuapp.com/api'
})

export default instance;