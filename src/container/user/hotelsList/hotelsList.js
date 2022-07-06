import React, {Component} from 'react'
import axios from '../../../axios/axios'
import classes from './hotelsList.module.css'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";
import Header from '../../../component/Headers/Headers'
import './styles.css'

import exm from './exm.png'
import ava from './avatar.png'
import roomCard from './RoomCard.png'

class hotelsList extends Component{
    constructor(props){
        super(props)
        this.state = {
            hotels: [],
            info: [],
            surname: '',
            name: '',
            loader: true
        }
    }

    componentDidMount(){
        axios.get('/hotel/getList', {headers: {Authorization: localStorage.getItem('token')}})
        .then((res) => {
            this.setState({hotels: res.data.hotels})
            console.log(this.state.hotels)
        })
        .catch((err) => console.log(err))

        axios.get('/account/getInfo', {headers: {Authorization: localStorage.getItem('token')}})
         .then((res2) => {
             console.log(res2);
             this.setState({info: res2.data.account})
             this.setState({surname: res2.data.account.lastName})
             this.setState({name: res2.data.account.firstName})
             this.setState({loader: false})
         })
         .catch((err3) => {
             console.log(err3);
         })
         console.log(this.state.surname);
    }

    render(){
        return(
            <div className={classes.container}>
                {this.state.loader === true ?
                    <h1>Загрузка</h1> :
                    <React.Fragment>
                        <Header/>
                        <div className={classes.listInfo}>
                            <div className={classes.infoBlock}>
                                <div className={classes.LeftInfo}>
                                    <p>Добрый день, <span>{this.state.name}</span></p>
                                </div>
                                <img src={ava}/>
                            </div>
                            <input placeholder='Введите город'/>
                        </div>
                        <div className={classes.firstRec}>
                        <Swiper
                            effect={"cards"}
                            grabCursor={true}
                            modules={[EffectCards]}
                            className={classes.mySwiper}
                        >
                            
                            {this.state.hotels.map((item) => 
                                <SwiperSlide>
                                    <Link to={{pathname: '/hotelInfo', state: {id: item._id}}}>
                                        <div className={classes.cardListFirst}>
                                            <img src={roomCard}/>
                                            <div className={classes.cardFirstInfo}>
                                                <span>{item.title}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )}
                        </Swiper>
                        </div>
                        <div className={classes.recSecond}>
                            <span>В вашем городе: </span>
                            <div className={classes.recSecondList}>
                                {this.state.hotels.map((item) => 
                                    <Link to={{pathname: '/hotelInfo', state: {id: item._id}}}>
                                        <div className={classes.cardSecondHotel}>
                                            <img src={exm}/>
                                            <div className={classes.secondInfoCard}>
                                                <h2>{item.title}</h2>
                                                <span>{item.address}</span>
                                            </div>
                                        </div>   
                                    </Link>
                                )}
                            </div>
                        </div>
                    </React.Fragment>
                }
            </div>
        )
    }
}

export default hotelsList