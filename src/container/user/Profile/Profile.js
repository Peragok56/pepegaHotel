import React, {Component} from "react";
import axios from "../../../axios/axios";
import classes from './Profile.module.css'
import avatar from './avatar.png'

class Profile extends Component{
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
                <h1>Профиль</h1>
                <div className={classes.info}>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <img src={avatar}/>
                    </div>
                    <h1>Имя:</h1>
                    <input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                    <h1>Фамилия:</h1>
                    <input value={this.state.surname} onChange={(e) => this.setState({surname: e.target.value})}/>
                    <h1>Почта:</h1>
                    <h1>{this.state.info.email}</h1>
                    <h1>Телефон:</h1>
                    <h1>+{this.state.info.phone}</h1>
                    <h1>Логин:</h1>
                    <h1>{this.state.info.login}</h1>
                    <button onClick={change}>Изменить</button>
                </div>
                <button className={classes.Exit} onClick={exit}>Выйти</button>
            </div>
        )
    }
}

export default Profile