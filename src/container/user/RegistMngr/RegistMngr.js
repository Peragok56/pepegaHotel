import React, { Component } from "react";
import classes from './RegistMngr.module.css'
import { Link } from "react-router-dom";
import axios from '../../../axios/axios'
import Swal from "sweetalert2";


class RegistMngr extends Component{
    render(){

        const registration = (e) => {
            e.preventDefault()
            let name = document.getElementById('name').value
            let surname = document.getElementById('surname').value
            let phone = document.getElementById('phone').value
            let login = document.getElementById('login').value
            let email = document.getElementById('email').value
            let password = document.getElementById('password').value

            axios.post('/account/registerManager', {firstName: name, lastName: surname, login: login, email: email, phone: phone, password: password})
            .then((res) => {
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Отлично',
                    text: 'Успешная регистрация!',
                  })
                  .then((result) => {if (result.isConfirmed) {
                    window.location.href='/auth'
                  }})
            })
            .catch((e) => {
                console.log(e);
            })
        }

        return(
            <div className={classes.Auth}>
                <div className={classes.authForm}>
                    <h1>Регистрация менеджера</h1>
                    <form>
                        <span>Имя</span>
                        <input placeholder="Имя" type='text' id="name"/>
                        <span>Фамилия</span>
                        <input placeholder="Фамилия" type='text' id="surname"/>
                        <span>Логин</span>
                        <input placeholder="Логин" type='text' id="login"/>
                        <span>Email</span>
                        <input placeholder="Email" type='email' id="email"/>
                        <span>Телефон</span>
                        <input placeholder="Телефон" type='text' id="phone"/>
                        <span>Пороль</span>
                        <input placeholder="Пороль" type='password' id="password"/>
                        <button onClick={registration}>Регистрация</button>
                    </form>
                    <span><p>Есть аккаунта? </p> <Link to={{pathname: '/auth'}}> Войти</Link></span>
                </div>
            </div>
        )
    }
}

export default RegistMngr