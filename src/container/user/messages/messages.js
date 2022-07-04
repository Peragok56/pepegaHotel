import React, {Component} from "react";
import axios from "../../../axios/axios";
import classes from './messages.module.css'

class Messages extends Component{
    constructor(props){
        super(props)
        this.state = {
            msg: []
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
                <h1>Чаты:</h1>
                {this.state.msg.length === 0 ?
                <h1>Чатов пока нету</h1> :
                this.state.msg.map((item) => {
                    console.log(item);
                })
                }
            </div>
        )
    }
}

export default Messages