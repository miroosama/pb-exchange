import { connect } from "react-redux"
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import { updateAccountAction } from '../actions/actions'


class DepositModal extends Component {

  state = {
    addType: "Account",
    addRate: "",
    value: "",
    index: ""
  }

  handleSelection = (event) => {
    console.dir(event.target.attributes[3].value)
    console.dir(event.target.id)
    console.dir(event.target)
    this.setState({
      addType: event.target.id,
      addRate: event.target.attributes[3].value,
      index: event.target.type
    })
  }

  handleSave = () => {
    let value = parseInt(this.state.value)
    let rate = parseInt(this.state.addRate)
    let newAccount = this.props.accounts.accounts
    newAccount[this.state.index] = {type:this.state.addType, amount:(rate + value)}
    console.log(newAccount, value)
    this.props.updateAccountAction(newAccount)
    this.props.closeModal("addModal")
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }


  render() {
    let accountList = Object.keys(this.props.accounts.accounts).map(account =>{
      return (
        <Dropdown.Item bsprefix="dropdown" type={account} id={this.props.accounts.accounts[account].type} key={this.props.accounts.accounts[account].type} value={this.props.accounts.accounts[account].amount} onClick={this.handleSelection}>{this.props.accounts.accounts[account].type}</Dropdown.Item>

    )
    })
    return (
      <div>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Add Account</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Dropdown>
              <Dropdown.Toggle value="Account" variant="success" id="dropdown-basic">
                {this.state.addType}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{overflowY: 'scroll', maxHeight: "300px"}}>
                {accountList}
              </Dropdown.Menu>
            </Dropdown>
            <Form onChange={this.handleChange}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" placeholder="0" />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => {this.props.closeModal("addModal")}}>Close</Button>
            <Button onClick={this.handleSave} variant="primary">Save changes</Button>
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

export default connect(mapStateToProps, { updateAccountAction } )(DepositModal);

// let index = (Object.keys(this.props.accounts.accounts).length += 1)
// let newAccount = index:{type:this.state.addType, amount:parseInt(this.state.value)}
// this.props.addAccountAction(newAccount)
// this.props.closeModal("addModal")
// let index = (Object.keys(this.props.accounts.accounts).length += 1)
// let newAccount = (this.props.accounts.accounts[index] ={type:this.state.addType, amount:parseInt(this.state.value)}
// this.props.addAccountAction(newAccount)
// this.props.closeModal("addModal")
