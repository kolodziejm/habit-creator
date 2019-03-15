import axios from "axios";

// Create instance, set it to localhost, after api deploy set to the actual domain
const instance = axios.create({
  baseURL: "http://localhost:5000/api"
});

export default instance;
