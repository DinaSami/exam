import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class UpdateForm extends Component {
    render() {
        return (
            <div>
                <Form>
                    <Form.Group >
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" value={this.props.name} onChange={e => {this.props.updateName(e)}}/>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Gender:</Form.Label>
                        <Form.Control type="text" value={this.props.gender} onChange={e => {this.props.updateGender(e)}}/>
                    </Form.Group>

                    <Button variant="primary" onClick= {this.props.updateWholeItem} >Update  </Button>

                </Form>
            </div>
        )
    }
}

export default UpdateForm
