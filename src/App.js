import './App.css';
import { Component } from 'react';
import {Switch, Route,} from 'react-router-dom'
import Layout from './hoc/layout/layout'
import './fonts.css'


import hotelsList from './container/user/hotelsList/hotelsList'
import Regist from './container/user/Regist/Regist';
import Home from './container/user/Home/Home'
import Auth from './container/user/Auth/Auth'
import Messages from './container/user/messages/messages';
import Profile from './container/user/Profile/Profile';
import RegistMngr from './container/user/RegistMngr/RegistMngr';
import followHotels from './container/user/followHotels/followHotels';
import hotelInfo from './container/user/hotelInfo/hotelInfo';
import chatRoom from './container/user/chatRoom/chatRoom';
import onBoarding from './container/user/onBoarding/onBoarding';
import ProfileChange from './container/user/ProfileChange/ProfileChange';

import hotelsListMngr from './container/manager/hotelsListMngr/hotelsListMngr';
import addHotel from './container/manager/addHotel/addHotel';
import chatMngr from './container/manager/chatMngr/chatMngr';
import chatRoomMngr from './container/manager/chatRoomMngr/chatRoomMngr';
import profileMngr from './container/manager/profileMngr/Profile';


class App extends Component{

  componentDidMount(){
    function checkAuth(){
        if (localStorage.getItem('exp')) {
          if (Date.now()/1000 > parseInt(localStorage.getItem('exp'))) {
              localStorage.clear()
              // console.log(window.location.pathname);
              if (window.location.pathname !=='/auth') {
                window.location.href='/auth'
              }
          }
        }
        
        setTimeout(checkAuth, 1000);
    }
    checkAuth()
    }

  render(){
    function router(role) {
      console.log(role);
      switch(role){
        case 'manager':
          return (
            <Switch>
              <Route path='/profileMngr' exact component={profileMngr}/>
              <Route path='/chatRoomMngr' exact component={chatRoomMngr}/>
              <Route path='/chatMngr' exact component={chatMngr}/>
              <Route path='/addHotel' exact component={addHotel}/>
              <Route path='/hotelsListMngr' exact component={hotelsListMngr}/>
              <Route path='/' exact component={Home}/>
            </Switch>
          );
        case 'user':
          return (
            <Switch>
              <Route path='/profileChange' exact component={ProfileChange}/>
              <Route path='/chatRoom' exact component={chatRoom}/>
              <Route path='/hotelInfo' exact component={hotelInfo}/>
              <Route path='/followHotels' exact component={followHotels}/>
              <Route path='/profile' component={Profile}/>
              <Route path='/messages' component={Messages}/>
              <Route path='/hotelsList' component={hotelsList}/>
              <Route path='/regist' exact component={Regist}/>
              <Route path='/auth' exact component={Auth}/>
              <Route path='/' exact component={Home}/>
            </Switch>
          );
        case null:
          return(
            <Switch>
              <Route path='/onBoarding' exact component={onBoarding}/>
              <Route path='/registMngr' component={RegistMngr}/>
              <Route path='/regist' exact component={Regist}/>
              <Route path='/auth' exact component={Auth}/>
              <Route path='/' exact component={Home}/>
            </Switch>
          )
          default: 
          break
      }
    }
    return (
      <Layout>
        {router(localStorage.getItem('role'))}
      </Layout>
    );
  }
}

export default App;
