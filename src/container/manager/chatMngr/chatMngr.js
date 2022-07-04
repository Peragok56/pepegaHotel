import React, {Component} from "react";
import classes from './chatMngr.module.css'
import axios from "../../../axios/axios";
import { Link } from "react-router-dom";
import {nanoid} from 'nanoid'
import Header from "../../../component/Headers/Headers";

class chatMngr extends Component{
    constructor(props){
        super(props)
        this.state = {
            msg: [],
            hotelId: ''
        }
    }

    componentDidMount(){
        axios.get('/hotel/getSelf', {headers: {Authorization: localStorage.getItem('token')}})
        .then((res) => {
            console.log(res);
            this.setState({hotelId: res.data.hotel._id})
        })
        .catch(err => err)
        axios.get('/message/getChats', {headers: {Authorization: localStorage.getItem('token')}})
        .then((res) => {
            console.log(res);
            this.setState({msg: res.data.chats})
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        return(
            <div className={classes.container}>
                <Header/>
                <h1>Чаты:</h1>
                {this.state.msg.length === 0 ?
                <h1>Чатов пока нету</h1> :
                <div className={classes.msgList}>
                    {this.state.msg.map((item) => 
                        <Link 
                            to={{
                                pathname: '/chatRoomMngr', 
                                state: {
                                    chatId: item._id,
                                    firstName: item.userAccount.firstName,
                                    lastName: item.userAccount.lastName,
                                }
                            }} key={nanoid()} >
                            <div className={classes.msg}>
                                <span>{item.userAccount.firstName} {item.userAccount.lastName}</span>
                                <h1>{item.lastMessage.text}</h1>
                            </div>
                        </Link>
                    )}
                </div>
                }
            </div>
        )
    }
}

export default chatMngr