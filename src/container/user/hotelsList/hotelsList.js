import React, {Component} from 'react'
import axios from '../../../axios/axios'
import classes from './hotelsList.module.css'
import exm from './exm.png'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'

class hotelsList extends Component{
    constructor(props){
        super(props)
        this.state = {
            hotels: []
        }
    }

    componentDidMount(){
        axios.get('/hotel/getList', {headers: {Authorization: localStorage.getItem('token')}})
        .then((res) => {
            this.setState({hotels: res.data.hotels})
            console.log(this.state.hotels)
        })
        .catch((err) => console.log(err))
    }

    render(){
        return(
            <div className={classes.container}>
                <h1>Отели:</h1>
                {this.state.hotels.length === 0 ?
                <h1>Отелей пока нету</h1>
                : 
                this.state.hotels.map((item) => 
                    <Link to={{pathname: '/hotelInfo', state: {id: item._id}}} key={nanoid()}>
                        <div className={classes.card}>
                            <img src={exm}/>
                            <div className={classes.cardInfo}>
                                <h1>{item.title}</h1>
                                <h4>$12.50/1hr</h4>
                                <h1>{item.address}</h1>
                            </div>
                        </div>
                    </Link>
                )
                }
            </div>
        )
    }
}

export default hotelsList