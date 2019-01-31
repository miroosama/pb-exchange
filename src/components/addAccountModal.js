import { connect } from "react-redux"
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import { addAccountAction} from '../actions/actions'


class AddAccountModal extends Component {

  state = {
    addType: "Account",
    addRate: "",
    value: ""
  }

  handleSelection = (event) => {

    this.setState({
      addType: event.target.id,
      addRate: event.target.attributes[2].value
    })
  }

  handleSave = () => {
    let index = (Object.keys(this.props.accounts.accounts).length += 1)
    let newAccount = {}
    newAccount[index] = {type: this.state.addType, amount:parseInt(this.state.value)}
    console.log(newAccount)
    this.props.addAccountAction(newAccount)
    this.props.closeModal("addModal")
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }


  render() {
    console.log(Object.keys(this.props.accounts.accounts).length)
    console.log(this.props.conversions.conversions)
        let accountsFilter = Object.keys(this.props.accounts.accounts).map(acc =>{
                return Object.keys(this.props.conversions.conversions).filter(account =>{
                  if(account !== this.props.accounts.accounts[acc].type){
                    return account
                  }
                })
            })
      let accountsDropdown = accountsFilter[0].map(account =>{
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

export default connect(mapStateToProps, { addAccountAction } )(AddAccountModal);
