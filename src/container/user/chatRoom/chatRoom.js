import React, {Component} from "react";
import axios from "../../../axios/axios";
import classes from './chatRoom.module.css'

class chatRoom extends Component{
    constructor(props){
        super(props)
        this.state = {
            msg: [],
            chatId: ''
        }
    }

    componentDidMount(){
        axios.get(`/message/getChatId?hotelId=${this.props.location.state.hotelId}`, {headers: {Authorization: localStorage.getItem('token')}})
        .then((res) => {
            console.log(res);
            this.setState({chatId: res.data.chatId})
            console.log(this.state.chatId);
            setInterval(() => {
                axios.get(`/message/getHistory?chatId=${this.state.chatId}`, {headers: {Authorization: localStorage.getItem('token')}})
                .then((res) => {
                    console.log(res);
                    this.setState({msg: res.data.messages})
                })
                .catch(err => console.log(err))
            }, 1000);
        })
        .catch(err => console.log(err))
    }

    render(){

        let send = () => {
            let text = document.getElementById('text').value
            axios.post('/message/send', 
            {
                chatId: this.state.chatId, 
                text: text
            }, 
            {headers: {Authorization: localStorage.getItem('token')}})
            .then((res) => {
                console.log(res)
                    document.getElementById('text').value = ''
                    axios.get(`/message/getHistory?chatId=${this.state.chatId}`, {headers: {Authorization: localStorage.getItem('token')}})
                    .then((res) => {
                        console.log(res);
                        this.setState({msg: res.data.messages})
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }

        return(
            <div className={classes.chatRoom}>
                <h1>{this.props.location.state.managerName} {this.props.location.state.managerSurName}</h1>
                <div className={classes.msgList}>
                    {this.state.msg.map((item) => 
                        <div className={classes.msg}>
                            <span>{item.account.firstName} {item.account.lastName}</span>
                            <h1>{item.text}</h1>
                        </div>
                    )}
                </div>
                <div className={classes.msgSend}>
                    <input id="text"/>
                    <button onClick={send}>Отправить</button>
                </div>
            </div>
        )
    }
}

export default chatRoom