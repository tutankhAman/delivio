import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',  // or whatever port your backend runs on
    withCredentials: true
});

export default instance;