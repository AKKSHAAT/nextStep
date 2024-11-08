import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:6969',
  timeout: 50000,
});

// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     const id = localStorage.getItem('id');
    
//     if (token) {
//       config.headers['authorization'] = `Bearer ${token}`;
//     } else {
//       console.log('No auth token found in localStorage');
//     }

//     if (id) {
//       config.headers['id'] = id;
//     } else {
//       console.log('No user ID found in localStorage');
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axios;
