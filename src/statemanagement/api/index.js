// fetch data from api
import axios from 'axios'
let baseURL;
// check if not production
if (process.env.NODE_ENV !== 'production') {
    baseURL = process.env.REACT_APP_BASE_URL_LOCAL;
} else {
    baseURL = process.env.REACT_APP_BASE_URL;
}
const API = axios.create({ baseURL }, { withCredentials: true });
API.interceptors.request.use(req => {
    const token = localStorage.getItem('authenticate');
    req.headers.Authorization = `Bearer ${token}`;
    return req;
}, error => {
    return Promise.reject(error.message);
}
);
export default API;