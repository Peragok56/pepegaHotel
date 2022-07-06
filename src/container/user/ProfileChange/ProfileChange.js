import React, {Component} from "react";
import axios from "../../../axios/axios";
import classes from './ProfileChange.module.css' 
import Header from "../../../component/Headers/Headers";

import back from './ep_back.png'
import avatar from './avatar.png'
import { Link } from "react-router-dom";

class ProfileChange extends Component{
    constructor(props){
        super(props)
        this.state = {
            info: [],
            name: '',
            surname: '',
        }
    }

    componentDidMount(){
        axios.get('/account/getInfo', {headers: {Authorization: localStorage.getItem('token')}})
         .then((res2) => {
             console.log(res2);
             this.setState({info: res2.data.account})
             this.setState({surname: res2.data.account.lastName})
             this.setState({name: res2.data.account.firstName})
         })
         .catch((err3) => {
             console.log(err3);
         })
         console.log(this.state.surname);
    }

    render(){

        let exit = () => {
            localStorage.clear()
            window.location.pathname = '/'
        }

        let change = () => {
            let name = this.state.name
            let surname = this.state.surname

            axios.patch('/account/edit', {firstName: name, lastName: surname}, {headers: {Authorization: localStorage.getItem('token')}})
            .then((res) => {
                console.log(res);
                axios.get('/account/getInfo', {headers: {Authorization: localStorage.getItem('token')}})
                .then((res2) => {
                    console.log(res2);
                    this.setState({info: res2.data.account})
                    this.setState({surname: res2.data.account.lastName})
                    this.setState({name: res2.data.account.firstName})
                })
                .catch((err3) => {
                    console.log(err3);
                })
                console.log(this.state.surname);
            })
            .catch((err) => {
                console.log(err);
            })
        }

        return(
            <div className={classes.container}>
                {console.log(this.state.info)}
                <div className={classes.perInfo}>
                    <Link to={{pathname: '/profile'}}>
                        <img src={back}/>
                    </Link>
                    <h1>Информация</h1>
                </div>
                <div className={classes.perSettings}>
                    <div className={classes.perList}>
                        <img src={avatar}/>
                        <button>Сменить фото</button>
                    </div>
                    <div className={classes.changeInfo}>
                        <span>Имя:</span>
                        <input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                    </div>
                    <div className={classes.changeInfo}>
                        <span>Фамилия:</span>
                        <input value={this.state.surname} onChange={(e) => this.setState({surname: e.target.value})}/>
                    </div>
                    <div className={classes.changeInfo}>
                        <span>Телефон:</span>
                        <input value={`+ ` + this.state.info.phone}/>
                    </div>
                    <div className={classes.changeInfo}>
                        <span>Email:</span>
                        <input value={this.state.info.email}/>
                    </div>
                    <button onClick={change}>Сохранить</button>
                </div>
            </div>
        )
    }
}

export default ProfileChange