import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios/axios";
import classes from './addHotel.module.css'

import back from './ep_back.png'


class addHotel extends Component{
    constructor(props){
        super(props)
        this.state = {
            photos: [],
            showPhoto: false
        }
    }
    render(){

        let addHotel = (e) => {
            e.preventDefault()
            let title = document.getElementById('title').value
            let description = document.getElementById('description').value
            let address = document.getElementById('address').value
            axios.post('/hotel/create', {title: title, description: description, address: address, photos: this.state.photos}, {headers: {Authorization: localStorage.getItem('token')}})
            .then((res) => {
                console.log(res)
                window.location.pathname = '/hotelsListMngr'
            })
            .catch((err) => console.log(err))
        }

        let addPhotoHotel = (e) => {
            e.preventDefault()

            let fData = new FormData()
            let file = document.getElementById('file').files[0]
            fData.append('file', file)

            axios.post('/attachment/upload', fData, {headers: {Authorization: localStorage.getItem('token')}})
            .then((res) => {
                console.log(res);
                this.state.photos.push(res.data.attachmentId)
                console.log(this.state.photos);
                file = ''
            })
            .catch(err => console.log(err))
        }

        let showPhoto = (e) => {
            e.preventDefault()
            this.setState({showPhoto: true})
        }

        return(
            <div className={classes.Auth}>
                <Link to={{pathname: '/hotelsListMngr'}}>
                    <img src={back}/>
                </Link>
                <div className={classes.authForm}>
                    <h1>Добавления отеля</h1>
                    <form>
                        <input placeholder="Название" type='text' id="title"/>
                        <input placeholder="Описание" type='text' id="description"/>
                        <input placeholder="Адрес" type='text' id="address"/>
                        {this.state.showPhoto === false ? 
                        null :
                        <React.Fragment>
                            <input placeholder="Загрузите фото" type='file' id="file"/>
                            <button onClick={(e) => addPhotoHotel(e)}>Сохранить</button>
                        </React.Fragment>
                        }
                        <button onClick={(e) => showPhoto(e)}>Добавить фотографии</button>
                        <button onClick={(e) => addHotel(e)}>Добавить</button>
                        
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default addHotel