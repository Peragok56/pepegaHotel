import React, {Component} from "react";
import axios from "../../../axios/axios";
import classes from './messages.module.css'
import Header from "../../../component/Headers/Headers";
import {nanoid} from 'nanoid'
import { Link } from "react-router-dom";

class Messages extends Component{
    constructor(props){
        super(props)
        this.state = {
            msg: [],
            block: 'msg'
        }
    }

    componentDidMount(){
        axios.get(`/message/getChats`, {headers: {Authorization: localStorage.getItem('token')}})
        .then((res) => {
            console.log(res);
            this.setState({msg: res.data.chats})
        })
        .catch((err) => console.log(err))
    }

    render(){
        return(
            <div className={classes.container}>
                <Header/>
                <div className={classes.msgInfo}>
                    <h1>Сообщения</h1>
                </div>
                <div className={classes.msgList}>
                    <div className={classes.blockSwitchMsg}>
                        <button style={{background: '#3845AB', color: 'white'}}>Чаты</button>
                        <button>Уведомления</button>
                    </div>
                    <input placeholder="Поиск"/>
                    <div className={classes.msgList}>
                        {this.state.msg.length === 0 ?
                            <h1>Сообщений пока нету</h1>
                        :
                            this.state.msg.map((item) => 
                                <Link  key={nanoid()} to={
                                    {
                                        pathname: '/chatRoom', 
                                        state: 
                                        {
                                            hotelId: item.hotel._id,
                                            managerName: item.hotel.managerAccount.firstName,
                                            managerSurName: item.hotel.managerAccount.lastName,
                                        }}}>
                                    <div className={classes.card}>
                                        <h1>{item.hotel.title}</h1>
                                        <span>{item.lastMessage.text}</span>
                                    </div>   
                                </Link> 
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Messages