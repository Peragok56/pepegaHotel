import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from '../../../axios/axios'
import classes from './hotelsListMngr.module.css'

class hotelsListMngr extends Component{
    constructor(props){
        super(props)
        this.state = {
            hotels: [],
            title: '',
            description: '',
            address: '',
        }
    }

    componentDidMount(){
        axios.get('/hotel/getSelf', {headers: {Authorization: localStorage.getItem('token')}})
        .then((res) => {
            console.log(res)
            this.setState({hotels: res.data.hotel})
            this.setState({title: res.data.hotel.title})
            this.setState({description: res.data.hotel.description})
            this.setState({address: res.data.hotel.address})
        })
        .catch((err) => console.log(err))
    }

    render(){

        let edit = () => {
            axios.patch('/hotel/edit', 
            {
                hotelId: this.state.hotels._id, 
                title: this.state.title, 
                description: this.state.description,
                address: this.state.address
            }, {headers: {Authorization: localStorage.getItem('token')}})
            .then((res) => {
                console.log(res);
                axios.get('/hotel/getSelf', {headers: {Authorization: localStorage.getItem('token')}})
                .then((res) => {
                    console.log(res)
                    this.setState({hotels: res.data.hotel})
                    this.setState({title: res.data.hotel.title})
                    this.setState({description: res.data.hotel.description})
                    this.setState({address: res.data.hotel.address})
                })
                .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
        }

        return(
            <div className={classes.container}>
                <h1>Ваш отель:</h1>
                {this.state.hotels.length === 0 ?
                <React.Fragment>
                    <h1>У вас пока нет отеля, но вы можете его добавить</h1>
                    <Link to='/addHotel'>Добавить отель</Link>
                </React.Fragment>
                : 
                <React.Fragment>
                    <div className={classes.card}>
                        <img src={'http://85.193.80.64:8181/' + this.state.hotels.photos[0].path}/>
                        <h2>Название:</h2>
                        <input value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}/>
                        <h2>Описание:</h2>
                        <textarea value={this.state.description} onChange={(e) => this.setState({description: e.target.value})}/>
                        <h2>Адрес:</h2>
                        <input value={this.state.address} onChange={(e) => this.setState({address: e.target.value})}/>
                    </div>
                    <button className={classes.button} onClick={edit}>Сохранить</button>
                </React.Fragment>
                }
            </div>
        )
    }
}

export default hotelsListMngr