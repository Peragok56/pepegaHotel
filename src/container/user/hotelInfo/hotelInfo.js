import React, {Component} from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios/axios";
import classes from './hotelInfo.module.css'

import Locate from './Locate.svg'

class hotelInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            info: [],
            managerName: '',
            managerSurName: '',
            photos: [],
            loading: true
        }
    }

    componentDidMount(){
        axios.get(`/hotel/getInfo?hotelId=${this.props.location.state.id}`, {headers: {Authorization: localStorage.getItem('token')}})
        .then((res) => {
            this.setState({info: res.data.hotel})
            this.setState({managerName: res.data.hotel.managerAccount.firstName})
            this.setState({managerSurName: res.data.hotel.managerAccount.lastName})
            this.setState({photos: res.data.hotel.photos})
            this.setState({loading: false})
            console.log(this.state.info.managerAccount.firstName);
            console.log(this.state.photos[0].path);
        })
    }

    render(){
        return(
            <div className={classes.container}>
                {this.state.loading === true ?
                <h1 style={{color: 'black'}}>Загрузка</h1> : 
                <React.Fragment>
                    <div className={classes.card}>
                    <img src={`http://85.193.80.64:8181/` + this.state.photos[0].path}/>
                    <h2><span><img src={Locate}/></span>{this.state.info.address}</h2>
                </div>
                <div className={classes.cardInfo}>
                    <h1>Описание</h1>
                    <p>{this.state.info.description}</p>
                    <div className={classes.Facilities}>
                        <h1>Удобства</h1>
                        <div className={classes.FacilitiesList}>
                            <h2>Elevator</h2>
                            <h2>Hot Water</h2>
                            <h2>Cooking place</h2>
                            <h2>Parking</h2>
                        </div>
                    </div>
                </div>
                <Link className={classes.button} 
                to={
                    {
                        pathname: '/chatRoom', 
                        state: 
                        {
                            hotelId: this.state.info._id,
                            managerName: this.state.managerName,
                            managerSurName: this.state.managerSurName,
                        }}}>Связаться</Link>
                </React.Fragment>
                }
            </div>
        )
    }
}

export default hotelInfo