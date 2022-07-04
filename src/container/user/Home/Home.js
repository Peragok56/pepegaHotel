import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from './Home.module.css'

import home from './home.svg'

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            Loggin: null,
        }
    }

    render(){    
        return(
            <div className={classes.main}>
                <div className={classes.info}>
                    <img src={home}/>
                    {localStorage.getItem('token') === null ? 
                        <Link
                            to={{
                                pathname: '/onBoarding'
                            }}
                        > 
                            Начать
                        </Link>
                    : localStorage.getItem('role') === 'user' ?
                    <Link
                        to={{
                            pathname: '/hotelsList'
                        }}
                        >
                        Начать
                      </Link>: 
                      <Link
                      to={{
                          pathname: '/hotelsListMngr'
                      }}
                      >
                      Начать
                    </Link>
                    }
                </div>
            </div>
        )
    }
}

export default Home