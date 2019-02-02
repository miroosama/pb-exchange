import { connect } from "react-redux"
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { updateAccountAction, transferAccountHistoryAction } from '../actions/actions'


class WithdrawModal extends Component {

  state = {
    withdrawType: "Account",
    balance: "",
    value: "",
    index: "",
    error: false
  }

  handleSelection = (event) => {
    this.setState({
      withdrawType: event.target.id,
      balance: event.target.attributes[3].value,
      index: event.target.type
    })
  }

  handleSave = () => {
    if((this.state.withdrawType !== "Account") && (this.state.value > 0) && (this.state.balance >= this.state.value)){
      let value = parseInt(this.state.value)
      let rate = parseInt(this.state.balance)
      let newAccount = this.props.accounts.accounts
      newAccount[this.state.index] = {type:this.state.withdrawType, amount:(rate - value), event:"Withdraw"}
      this.props.updateAccountAction(newAccount)
      this.props.transferAccountHistoryAction({type:this.state.withdrawType, amount:value, event:"Withdraw"})
      this.props.closeModal("withdrawModal")
    } else {
      this.setState({ error: true })
    }
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
        <Modal show={true} onHide={() => {this.props.closeModal("withdrawModal")}}>
          <Modal.Header>
            <Modal.Title>Withdraw</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Dropdown>
              <Dropdown.Toggle value="Account" variant="success" id="dropdown-basic">
                {this.state.withdrawType}
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
            <Button variant="secondary" onClick={() => {this.props.closeModal("withdrawModal")}}>Close</Button>
            <Button onClick={this.handleSave} variant="primary">Save changes</Button>
          </Modal.Footer>
          {this.state.error ? <Alert dismissible variant="danger">
              <Alert.Heading>Select account and enter amount</Alert.Heading>
          </Alert> : null}
        </Modal>;
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

export default connect(mapStateToProps, { updateAccountAction, transferAccountHistoryAction} )(WithdrawModal);
