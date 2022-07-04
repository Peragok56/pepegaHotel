import React, { Component } from "react";
import classes from './Regist.module.css'
import { Link } from "react-router-dom";
import axios from '../../../axios/axios'
import Swal from "sweetalert2";


class Regist extends Component{
    render(){

        const registration = (e) => {
            e.preventDefault()
            let name = document.getElementById('name').value
            let surname = document.getElementById('surname').value
            let phone = document.getElementById('phone').value
            let login = document.getElementById('login').value
            let email = document.getElementById('email').value
            let password = document.getElementById('password').value

            axios.post('/account/register', {firstName: name, lastName: surname, login: login, email: email, phone: phone, password: password})
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
                    <h1>Регистрация</h1>
                    <form onSubmit={registration}>
                        <span>Имя</span>
                        <input placeholder="Имя" type='text' id="name" required/>
                        <span>Фамилия</span>
                        <input placeholder="Фамилия" type='text' id="surname" required/>
                        <span>Логин</span>
                        <input placeholder="Логин" type='phone' id="login" required/>
                        <span>Почта</span>
                        <input placeholder="Email" type='email' id="email" required/>
                        <span>Телефон</span>
                        <input placeholder="Телефон" type='text' id="phone" required/>
                        <span>Пароль</span>
                        <input placeholder="Пароль" type='password' id="password" required/>
                        {/* <button onClick={registration}>Регистрация</button> */}
                        <input type='submit' value='Регистрация'/>
                    </form>
                    <span><p>Есть аккаунта? </p> <Link to={{pathname: '/auth'}}> Войти</Link></span>
                    <Link to='/registMngr'>Зарегестрироваться как менеджер</Link>
                </div>
            </div>
        )
    }
}

export default Regist