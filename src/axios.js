import axios from "axios";
const instance = axios.create({
  baseURL: "https://handmade-heaven.netlify.app/.netlify/functions/index", // The api {cloud functions} url
  // baseURL: 'http://127.0.0.1:4040'
});
export default instance;
// this is axios
