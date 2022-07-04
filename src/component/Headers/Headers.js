import React, {Component} from "react";
import {NavLink} from 'react-router-dom'

import {ReactComponent as Bag} from './bag.svg'
import {ReactComponent as Heart} from './Heart.svg'
import {ReactComponent as Home} from './Home.svg'
import {ReactComponent as Messages} from './Messages.svg'
import avatar from './avatar.png'

class Header extends Component{
    render(){
        return(
            <div className="Header">
                {localStorage.getItem('role') === 'user' ? 
                    <nav>
                    <NavLink
                        exact to="/hotelsList"
                        activeClassName="selected"
                        >
                         <Home />
                        </NavLink>
                        <NavLink
                            exact to="/messages"
                            activeClassName="selected"
                        >
                            <Messages/>
                        </NavLink>
                        <NavLink
                            exact to="/followHotels"
                            activeClassName="selected"
                        >
                            <Heart />
                        </NavLink>
                        {/* <NavLink
                            exact to="/"
                            activeClassName="selected"
                        >
                            <Bag/>
                        </NavLink> */}
                        <NavLink
                            exact to="/profile"
                            activeClassName="selected"
                        >
                            <img src={avatar}/>
                        </NavLink>
                    </nav>  :
                    <nav>
                    <NavLink
                        exact to="/hotelsListMNGR"
                        activeClassName="selected"
                        >
                         <Home />
                        </NavLink>
                        <NavLink
                            exact to="/chatMngr"
                            activeClassName="selected"
                        >
                            <Messages/>
                        </NavLink>
                        {/* <NavLink
                            exact to="/"
                            activeClassName="selected"
                        >
                            <Heart />
                        </NavLink> */}
                        {/* <NavLink
                            exact to="/"
                            activeClassName="selected"
                        >
                            <Bag/>
                        </NavLink> */}
                        <NavLink
                            exact to="/profileMngr"
                            activeClassName="selected"
                        >
                            <img src={avatar}/>
                        </NavLink>
                    </nav> 
                }              
            </div>
        )
    }
}

export default Header