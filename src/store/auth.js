import axios from "../axios/axios";

export function auth(e, login, password) {
    e.preventDefault()
     axios.post('/account/login', {login: login, password: password})
     .then((res) => {
         console.log(res);
         localStorage.setItem('token', res.data.token);
         localStorage.setItem('exp', res.data.expiresIn);
         console.log(res.data.token);
         axios.get('/account/getInfo', {headers: {Authorization: localStorage.getItem('token')}})
         .then((res2) => {
             console.log(res2);
             console.log(res2.data);
             localStorage.setItem('role', res2.data.account.role.name)
             localStorage.setItem('name', res2.data.account.login)
             if (res2.data.account.role.name === 'user') {
                window.location.pathname = '/hotelsList'
             } else {
                window.location.pathname = '/hotelsListMngr'
             }
         })
         .catch((err3) => {
             console.log(err3);
         })
     })
     .catch((err) => {
         console.log(err);
     })
}