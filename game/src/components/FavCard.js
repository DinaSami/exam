import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UpdateForm from './UpdateForm'

export class FavCard extends Component {
    render() {
        return (
            <div>
                {this.props.show &&
                    <UpdateForm
                    name={this.props.name}
                    gender={this.props.gender}
                    slug={this.props.slug}
                    updateName={this.props.updateName}
                    updateGender={this.props.updateGender}
                    updateWholeItem={this.props.updateWholeItem}
                    />
                }
                {this.props.dataFav.map(element => {
                    return (
                        <Card style={{ width: '20rem' }} className='m-5'>

                            <Card.Body>
                                <Button variant="danger"  onClick={e => { this.props.deletingFav(element.slug) }}>Delete!</Button>
                                <Button variant="success" onClick={e => {this.props.updateEachItem(element.name,element.gender,element.slug)}}>Update!</Button>
                                <Card.Title>Name :{element.name}</Card.Title>
                                <Card.Title>Gender :{element.gender}</Card.Title>
                                <Card.Title>Powers :{element.psiPowers}</Card.Title>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        )
    }
}

export default FavCard
