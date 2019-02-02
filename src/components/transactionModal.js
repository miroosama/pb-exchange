import { connect } from "react-redux"
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { transferAccountAction, transferAccountHistoryAction } from '../actions/actions'


class TransactionModal extends Component {

  state = {
    txType: "Account",
    balance: "",
    value: 0,
    index: "",
    txType2: "Account",
    balance2: "",
    index2: "",
    convertedValue: "",
    error: false
  }

  handleSelection = (event) => {
    this.setState({
      txType: event.target.id,
      balance: event.target.attributes[3].value,
      index: event.target.type
    })
  }

  handleSelection2 = (event) => {
    this.setState({
      txType2: event.target.id,
      balance2: event.target.attributes[3].value,
      index2: event.target.type
    })
  }

  handleSave = () => {
console.log("first", this.state)
    if((this.state.value > 0) && (this.state.txType !== "Account") && (this.state.txType2 !== "Account") && (this.state.txType !== this.state.txType2) && (parseFloat(this.state.balance) >= this.state.value)){
      let value = parseFloat(this.state.value)
      let bal = parseFloat(this.state.balance)
      let newAccount = this.props.accounts.accounts
      newAccount[this.state.index] = {type:this.state.txType, amount:(bal - value)}
      this.props.transferAccountAction(newAccount)
      this.exchange()
    }else {
        this.setState({ error: true })
      }
  }

  exchange = () =>{
    console.log("sec", this.state)
    if(this.state.txType === "EUR"){
      let conversionRate = this.props.conversions.conversions[this.state.txType2]
      let value = parseFloat(this.state.value)
      let convertedValue = value * conversionRate
      this.completedExchange(convertedValue)
    } else if(this.state.txType !== "EUR" && this.state.txType2 !== "EUR") {
      let conversionRate = this.props.conversions.conversions[this.state.txType]
      let value = parseFloat(this.state.value)
      let convertedToBase = value/conversionRate
      let conversionRate2 = this.props.conversions.conversions[this.state.txType2]
      let convertedValue = convertedToBase * conversionRate2
      this.completedExchange(convertedValue)
    } else {
      let conversionRate = this.props.conversions.conversions[this.state.txType]
      let value = parseFloat(this.state.value)
      let convertedToBase = value/conversionRate
      this.completedExchange(convertedToBase)
    }
  }

  completedExchange = (convertedValue) => {
    console.log("third", this.state)
      if((this.state.value > 0) && (this.state.txType !== "Account") && (this.state.txType2 !== "Account") && (this.state.txType !== this.state.txType2)){
      let balance2 = parseFloat(this.state.balance2)
      let newAccount2 = this.props.accounts.accounts
      newAccount2[this.state.index2] = {type:this.state.txType2, amount:(balance2 + convertedValue)}
      this.props.transferAccountAction(newAccount2)
      let accHistory = {type: this.state.txType, to:this.state.txType2, amount: convertedValue, event:"Transfer"}
      this.props.transferAccountHistoryAction(accHistory)
      this.props.closeModal("transactionModal")
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

    let accountList2 = Object.keys(this.props.accounts.accounts).map(account =>{
      return (
        <Dropdown.Item bsprefix="dropdown" type={account} id={this.props.accounts.accounts[account].type} key={this.props.accounts.accounts[account].type} value={this.props.accounts.accounts[account].amount} onClick={this.handleSelection2}>{this.props.accounts.accounts[account].type}</Dropdown.Item>

    )
    })
    return (
      <div>
        <Modal show={true} onHide={() => {this.props.closeModal("transactionModal")}}>
          <Modal.Header>
            <Modal.Title>Transfer</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Dropdown>
                <Dropdown.Toggle value="Account" variant="success" id="dropdown-basic">
                  {this.state.txType}
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
              <Dropdown>
                <Dropdown.Toggle value="Account" variant="success" id="dropdown-basic">
                  {this.state.txType2}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{overflowY: 'scroll', maxHeight: "300px"}}>
                  {accountList2}
                </Dropdown.Menu>
              </Dropdown>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {this.props.closeModal("transactionModal")}}>Close</Button>
            <Button onClick={this.handleSave} variant="primary">Save changes</Button>
          </Modal.Footer>
          {this.state.error ? <Alert dismissible variant="danger">
              <Alert.Heading>Select accounts and enter amount</Alert.Heading>
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

export default connect(mapStateToProps, { transferAccountAction, transferAccountHistoryAction } )(TransactionModal);
