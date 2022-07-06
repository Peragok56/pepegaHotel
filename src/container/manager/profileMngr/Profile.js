import React, {Component} from "react";
import axios from "../../../axios/axios";
import classes from './Profile.module.css' 
import Header from "../../../component/Headers/Headers";

import avatar from './avatar.png'
import signOut from './signOut.png'
import { Link } from "react-router-dom";

class profileMngr extends Component{
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

        return(
            <div className={classes.container}>
                <Header/>
                <div className={classes.perInfo}>
                    <h1>Профиль</h1>
                    <div className={classes.perList}>
                        <img src={avatar}/>
                        <div className={classes.rightPer}>
                            <h1>{this.state.name}</h1>
                            <h1>{this.state.surname}</h1>
                        </div>
                    </div>
                </div>
                <div className={classes.perSettings}>
                    <div className={classes.exit} onClick={exit}>
                        <img src={signOut}/>
                        <p>Выйти</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default profileMngr