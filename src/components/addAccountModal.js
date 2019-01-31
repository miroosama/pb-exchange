import { connect } from "react-redux"
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { addAccountAction} from '../actions/actions'


class AddAccountModal extends Component {

  state = {
    addType: "Account",
    addRate: "",
    value: "",
    error: false
  }

  handleSelection = (event) => {
    this.setState({
      addType: event.target.id,
      addRate: event.target.attributes[2].value
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
      // this.props.closeModal("addModal")
    } else {
      let index = (Object.keys(this.props.accounts.accounts).length += 1)
      let newAccount = {}
      newAccount[index] = {type: this.state.addType, amount:parseInt(this.state.value)}
      console.log(newAccount)
      this.props.addAccountAction(newAccount)
      this.props.closeModal("addModal")

    }
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }


  render() {
    console.log(Object.keys(this.props.accounts.accounts).length)
    console.log(this.props.conversions.conversions)
    let accountsDropdown = Object.keys(this.props.conversions.conversions).map(account =>{
            return (
              <Dropdown.Item bsprefix="dropdown" id={account} key={account} value={this.props.conversions.conversions[account]} onClick={this.handleSelection}>{account}</Dropdown.Item>
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
        </Modal.Dialog>
        {this.state.error ? <Alert dismissible variant="danger">
            <Alert.Heading>Account already exists</Alert.Heading>
        </Alert> : null}
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

export default connect(mapStateToProps, { addAccountAction } )(AddAccountModal);
