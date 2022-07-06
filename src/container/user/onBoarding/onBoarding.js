import React, {Component} from "react";
import classes from './onBoarding.module.css'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

import classStyle from './styles.module.css'

import first from './first.png'
import second from './second.png'
import three from './three.png'

import { Link } from "react-router-dom";

class onBoarding extends Component{
    constructor(props){
        super(props)
        this.state = {
            list: 'first'
        }
    }
    render(){

        let showBlock = (role) => {
            switch(role){
                case 'first':
                  return (
                    <React.Fragment>
                        <img src={first}/>
                        <div className={classes.info}>
                            <h1>Choose from a thousand of places</h1>
                            <p>We provide you with a variant of accomodation for a better choice</p>
                            <button className={classes.Next} onClick={() => this.setState({list: 'second'})}>Next</button>
                        </div>
                    </React.Fragment>
                  );
                case 'second':
                  return (
                    <React.Fragment>
                        <img src={second}/>
                        <div className={classes.info}>
                            <h1>Choose from a thousand of places</h1>
                            <p>We provide you with a variant of accomodation for a better choice</p>
                            <div className={classes.buttonList}>
                                    <button className={classes.Back} onClick={() => this.setState({list: 'first'})}>Back</button>
                                <button className={classes.Next} onClick={() => this.setState({list: 'three'})}>Next</button>
                            </div>
                        </div>
                    </React.Fragment>
                  );
                case 'three':
                  return(
                    <React.Fragment>
                        <img src={three}/>
                        <div className={classes.info}>
                            <h1>Cool and secure service</h1>
                            <p>We provide you with a variant of accomodation for a better choice</p>
                            <div className={classes.buttonList}>
                                <Link className={classes.Next} to='/regist'>Sign up</Link>
                                <Link className={classes.Back} to='/auth'>Sign in</Link>
                            </div>
                        </div>
                    </React.Fragment>     
                  )
                  default: 
                  break
              }
        }

        return(
            <div className={classes.container}>
                <Swiper pagination={true} modules={[Pagination]} className={classes.swiper}>
                    <SwiperSlide>
                        <React.Fragment>
                            <img src={first}/>
                            <div className={classes.info}>
                                <h1>Choose from a thousand of places</h1>
                                <p>We provide you with a variant of accomodation for a better choice</p>
                            </div>
                        </React.Fragment>
                    </SwiperSlide>
                    <SwiperSlide>
                    <React.Fragment>
                        <img src={second}/>
                        <div className={classes.info}>
                            <h1>Choose from a thousand of places</h1>
                            <p>We provide you with a variant of accomodation for a better choice</p>
                            <div className={classes.buttonList}>
                            </div>
                        </div>
                    </React.Fragment>
                    </SwiperSlide>
                    <SwiperSlide>
                    <React.Fragment>
                        <img src={three}/>
                        <div className={classes.info}>
                            <h1>Cool and secure service</h1>
                            <p>We provide you with a variant of accomodation for a better choice</p>
                            <div className={classes.buttonList}>
                                <Link className={classes.Next} to='/regist'>Sign up</Link>
                                <Link className={classes.Back} to='/auth'>Sign in</Link>
                            </div>
                        </div>
                    </React.Fragment>    
                    </SwiperSlide>
                </Swiper>
            </div>  
        )
    }
}

export default onBoarding