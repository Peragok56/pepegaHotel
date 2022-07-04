import React, { Component } from "react";
import classes from './Auth.module.css'
import { Link } from "react-router-dom";
import {auth} from '../../../store/auth'


class Auth extends Component{
    render(){
        return(
            <div className={classes.Auth}>
                <div className={classes.authForm}>
                    <h1>Авторизация</h1>
                    <form>
                        <span>Логин</span>
                        <input placeholder="Логин" type='text' id="login"/>
                        <span>Пороль</span>
                        <input placeholder="Пороль" type='password' id="password"/>
                        <button onClick={(e) => 
                        auth(e,
                            document.getElementById('login').value,
                            document.getElementById('password').value    
                        )}>Войти</button>
                    </form>
                    <span><p>Нет аккаунта? </p> <Link to={{pathname: '/regist'}}> Зарегистрироваться</Link></span>
                </div>
            </div>
        )
    }
}

export default Auth