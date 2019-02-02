import { connect } from "react-redux"
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { addAccountAction, transferAccountHistoryAction } from '../actions/actions'


class AddAccountModal extends Component {

  state = {
    addType: "Account",
    balance: "",
    value: "",
    error: false,
    amountValid: false
  }

  handleSelection = (event) => {
    this.setState({
      addType: event.target.id,
      balance: event.target.attributes[2].value
    })
  }

  duplicateCheck = () => {
    let existing = Object.keys(this.props.accounts.accounts).map(acc=>{
      return this.props.accounts.accounts[acc].type
    })
    return existing
  }


  handleSave = () => {
    let check = this.duplicateCheck()
    if(check.some(acc => acc === this.state.addType)){
      this.setState({error: true})
    } else if(this.state.value > 0 && this.state.addType !== "Account") {
      let index = (Object.keys(this.props.accounts.accounts).length += 1)
      let newAccount = {}
      newAccount[index] = {type: this.state.addType, amount:parseFloat(this.state.value).toFixed(2), event: "Deposit"}
      this.props.addAccountAction(newAccount)
      this.props.transferAccountHistoryAction({type: this.state.addType, amount:parseFloat(this.state.value).toFixed(2), event: "Deposit"})
      this.props.closeModal("addModal")
    } else {
      this.setState({amountValid: true})
    }
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }


  render() {
    let accountsDropdown = Object.keys(this.props.conversions.conversions).map(account =>{
            return (
              <Dropdown.Item bsprefix="dropdown" id={account} key={account} value={this.props.conversions.conversions[account]} onClick={this.handleSelection}>{account}</Dropdown.Item>
          )
        })
    return (
      <div>
      <Modal show={true} onHide={() => {this.props.closeModal("addModal")}}>
          <Modal.Header>
            <Modal.Title>Add Account</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Dropdown>
                <Dropdown.Toggle value="Account" variant="success" id="dropdown-basic">
                  {this.state.addType}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{overflowY: 'scroll', maxHeight: "300px"}}>
                  {accountsDropdown}
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
          {this.state.error ? <Alert dismissible variant="danger">
              <Alert.Heading>Account already exists</Alert.Heading>
          </Alert> : null}
          {this.state.amountValid ? <Alert dismissible variant="danger">
              <Alert.Heading>Select account and enter amount</Alert.Heading>
          </Alert> : null}
        </Modal>
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

export default connect(mapStateToProps, { addAccountAction, transferAccountHistoryAction } )(AddAccountModal);
