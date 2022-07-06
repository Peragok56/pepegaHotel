import axios from "../axios/axios";
import Swal from "sweetalert2";

export function auth(e, login, password) {
    e.preventDefault()
     axios.post('/account/login', {login: login, password: password})
     .then((res) => {
         console.log(res.status);
         localStorage.setItem('token', res.data.token);
         localStorage.setItem('exp', res.data.expiresIn);
         console.log(res.data.token);
         axios.get('/account/getInfo', {headers: {Authorization: localStorage.getItem('token')}})
         .then((res2) => {
             console.log(res2);
             console.log(res2.data);
             localStorage.setItem('id', res2.data.account._id)
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
        if (err.response.status === 403) {
            Swal.fire({
                icon: 'error',
                title: 'Упсс',
                text: 'Неверный пароль',
              })
        }
        if (err.response.status === 422) {
            Swal.fire({
                icon: 'error',
                title: 'Упсс',
                text: 'Неверный пароль',
              })
        }
         console.log(err);
     })
}