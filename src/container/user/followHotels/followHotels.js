import React, {Component} from 'react'
import classes from './followHotels.module.css'

class followHotels extends Component{
    constructor(props){
        super(props)
        this.state = {
            follow: [],
        }
    }
    render(){
        return(
            <div className={classes.container}>
                <h1>Избранные:</h1>
                {this.state.follow.length === 0 ?
                    <h1>Вы пока не добавили отели</h1> :
                    this.state.follow.map((item) => {
                        console.log(item);
                    })
                }
            </div>
        )
    }
}

export default followHotels