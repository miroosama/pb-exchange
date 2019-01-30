import { connect } from "react-redux"
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'


class TransactionModal extends Component {

  state = {
    transferFromType: "Account",
    transferFromValue: ""
  }

  handleSelection = (event) => {
    console.dir(event.target.attributes[2].value)
    console.dir(event.target.id)

    this.setState({
      transferFromType: event.target.id,
      transferFromValue: event.target.attributes[2].value
    })
  }


  render() {
    console.log(this.props.accounts)
    console.log(this.props.conversions.conversions)
    let accountsDropdown = this.props.accounts.accounts.map(account =>{
            return (
              <Dropdown.Item bsprefix="dropdown" id={account.type} key={account.type} value={account.amount} onClick={this.handleSelection}>{account.type}</Dropdown.Item>
          )
        })
    return (
      <div>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Exchange Currency</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Dropdown>
              <Dropdown.Toggle value="Account" variant="success" id="dropdown-basic">
                {this.state.transferFromType}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {accountsDropdown}
              </Dropdown.Menu>
            </Dropdown>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>;
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    accounts: state.accounts,
    conversions: state.conversions
  }
}

export default connect(mapStateToProps)(TransactionModal);
