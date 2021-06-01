import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export class ApiCards extends Component {
    render() {
        return (
            <div>
                {this.props.dataArray.map(element => {
                    return (
                        <Card style={{ width: '18rem' }} className='m-5'>
                        
                        <Card.Body>
                            <Card.Title>Name : {element.name}</Card.Title>
                            <Card.Title>Gender : {element.gender}</Card.Title>
                            <Card.Img variant="top" src={element.img} />
                            <Card.Title>Powers : {element.psiPowers}</Card.Title>
                            <Button variant="primary" onClick={e => {this.props.addingItems(element.name ,element.gender,element.psiPowers)}}>save to favorites!</Button>
                        </Card.Body>
                    </Card>
                    )
                })}
            </div>
        )
    }
}

export default ApiCards
