import React, { Component } from 'react';
import axios from 'axios';
import FavCard from './FavCard'

export class Fav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_SERVER,
            dataFav: [],
            name: '',
            gender: '',
            show: false,
            slug : ''
        }
    }

    // getting data saved in data base from server

    componentDidMount = async () => {
        const urlDataFav = await axios.get(`http://localhost:3002/getCharacters/favorite`);
        this.setState({
            dataFav: urlDataFav.data
        })
        console.log(this.state.dataFav);
    }

    // deleting items from data base and favorite page

    deletingFav = async (slug) => {
        const urlDataFav = await axios.delete(`http://localhost:3002/getCharacters/favorite/${slug}`);
        this.setState({
            dataFav: urlDataFav.data
        })
    }
 
    // to show placeholder in updating form
    updateEachItem = (name, gender, slug) => {
        this.setState({
            show : true,
            name : name,
            gender : gender,
            slug : slug
        })
    }

      // setstate for data according to events(data that typedin form)

    updateName = (e) => {this.setState({name : e.target.value})}
    updateGender = (e) => {this.setState({gender : e.target.value})}
        
     // updating specific data in data base  
    updateWholeItem = async () => {
        const reqBody = {
            name : this.state.name,
            gender : this.state.gender
        }

        const urlDataFav = await axios.put(`http://localhost:3002/getCharacters/favorite/${this.state.slug}` ,reqBody);
        this.setState({
            dataFav : urlDataFav.data
        })
        window.location.reload();
    }
    
    render() {
        return (
            <div>
                <FavCard
                    dataFav={this.state.dataFav}
                    deletingFav={this.deletingFav}
                    updateEachItem={this.updateEachItem}
                    show={this.state.show}
                    name={this.state.name}
                    gender={this.state.gender}
                    slug={this.state.slug}
                    updateName={this.updateName}
                    updateGender={this.updateGender}
                    updateWholeItem={this.updateWholeItem}
                />
            </div>
        )
    }
}

export default Fav
