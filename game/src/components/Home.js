import React, { Component } from 'react';
import ApiCards from './ApiCards';
import axios from 'axios';

// Home page

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_SERVER,
            dataArray: []
        }
    }

    // geeting api data from server
    componentDidMount = async () => {
        const urlData = await axios.get(`http://localhost:3002/getCharacters`);
        this.setState({
            dataArray: urlData.data
        })
        console.log(this.state.dataArray);
    }

    // adding items to be as saved data in data base when enter the favorite page it will be shown

    addingItems = async (name, gender, psiPowers) => {
        const dataAdded = {
            name: name,
            gender: gender,
            psiPowers: psiPowers
        }
        await axios.post(`http://localhost:3002/getCharacters/favorite`, dataAdded)
    }

    render() {
        return (
            <div>
                <ApiCards // components contains rendered cards  for api data from server
                    dataArray={this.state.dataArray}
                    addingItems={this.addingItems}
                />
            </div>
        )
    }
}

export default Home
