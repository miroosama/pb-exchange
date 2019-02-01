import { connect } from "react-redux"
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import { updateAccountAction } from '../actions/actions'


class TransactionModal extends Component {

  state = {
    addType: "Account",
    addRate: "",
    value: "",
    index: "",
    addType2: "Account",
    addRate2: "",
    index2: "",
    convertedValue: ""
  }

  handleSelection = (event) => {
    // console.dir(event.target.attributes[3].value)
    // console.dir(event.target.id)
    // console.dir(event.target)
    this.setState({
      addType: event.target.id,
      addRate: event.target.attributes[3].value,
      index: event.target.type
    })
  }

  handleSelection2 = (event) => {
    console.dir(event.target.attributes[3].value)
    console.dir(event.target.id)
    console.dir(event.target)
    this.setState({
      addType2: event.target.id,
      addRate2: event.target.attributes[3].value,
      index2: event.target.type
    })
  }

  handleSave = () => {
    // let value = parseInt(this.state.value)
    // let rate = parseInt(this.state.addRate)
    // let newAccount = this.props.accounts.accounts
    // newAccount[this.state.index] = {type:this.state.addType, amount:(rate + value)}
    // console.log(newAccount, value)
    // this.props.updateAccountAction(newAccount)
    // this.props.closeModal("addModal")
    //
    let value = parseFloat(this.state.value)
    let rate = parseFloat(this.state.addRate)
    let newAccount = this.props.accounts.accounts
    newAccount[this.state.index] = {type:this.state.addType, amount:(rate - value)}
    console.log(newAccount, value)
    this.props.updateAccountAction(newAccount)
    // this.props.closeModal("addModal")

    // let value2 = parseInt(this.state.value2)
    // let rate2 = parseInt(this.state.addRate2)
    // let newAccount2 = this.props.accounts.accounts
    // newAccount[this.state.index2] = {type:this.state.addType2, amount:(rate2 + value)}
    // console.log(newAccount, value)
    // this.props.updateAccountAction(newAccount2)
    // this.props.closeModal("addModal")
    this.exchange()

  }

  exchange = () =>{
      if(this.state.addType === "EUR"){
        let conversionRate = this.props.conversions.conversions[this.state.addType2]
        let value = parseFloat(this.state.value)
        let convertedValue = value * conversionRate
        this.completedExchange(convertedValue)
      } else if(this.state.addType !== "EUR" && this.state.addType2 !== "EUR") {
        let conversionRate = this.props.conversions.conversions[this.state.addType]
        let value = parseFloat(this.state.value)
        let convertedToBase = value/conversionRate
        let conversionRate2 = this.props.conversions.conversions[this.state.addType2]
        let convertedValue = convertedToBase * conversionRate2
        this.completedExchange(convertedValue)
      } else {
        let conversionRate = this.props.conversions.conversions[this.state.addType]
        let value = parseFloat(this.state.value)
        let convertedToBase = value/conversionRate
        this.completedExchange(convertedToBase)
      }
  }

  completedExchange = (convertedValue) => {
    let rate2 = parseFloat(this.state.addRate2)
    console.log(rate2)
    let newAccount2 = this.props.accounts.accounts
    newAccount2[this.state.index2] = {type:this.state.addType2, amount:(rate2 + convertedValue)}
    this.props.updateAccountAction(newAccount2)
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }


  render() {
    console.log(this.state)
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
            <Dropdown>
              <Dropdown.Toggle value="Account" variant="success" id="dropdown-basic">
                {this.state.addType2}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{overflowY: 'scroll', maxHeight: "300px"}}>
                {accountList2}
              </Dropdown.Menu>
            </Dropdown>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => {this.props.closeModal("depositModal")}}>Close</Button>
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

export default connect(mapStateToProps, { updateAccountAction } )(TransactionModal);
