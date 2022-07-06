import React, { Component } from "react";
import classes from './Auth.module.css'
import { Link } from "react-router-dom";
import {auth} from '../../../store/auth'

import confirm from './confirm.png'


class Auth extends Component{
    render(){
        return(
            <div className={classes.Auth}>
                
                <div className={classes.authForm}>
                    <div className={classes.assist}>
                        <img src={confirm}/> <br/>
                        <h1>Вход</h1>
                    </div>
                    <form onSubmit={(e) => 
                        auth(e,
                            document.getElementById('login').value,
                            document.getElementById('password').value    
                        )}>
                        <span>Логин</span>
                        <input placeholder="Логин" type='text' id="login" required/>
                        <span>Пороль</span>
                        <input placeholder="Пороль" type='password' id="password" required/>
                        <input type='submit' value='Войти'/>
                        <span><p>Еще нет аккаунта?</p> <Link to={{pathname: '/regist'}}> Зарегистрироваться</Link></span>
                    </form>
                </div>
            </div>
        )
    }
}

export default Auth