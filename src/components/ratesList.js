import { connect } from "react-redux"
import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class RatesList extends Component {


  render() {
    let ratesList = Object.keys(this.props.conversions.conversions).map(type =>{
      return (
        <tr key={type}>
          <td>{type}</td>
          <td>{this.props.conversions.conversions[type]}</td>
        </tr>
    )
  })

    return (
      <div>
      <Modal show={true} onHide={() => {this.props.closeModal("ratesList")}}>
        <Modal.Header>
          <Modal.Title>Exchange Rate to EUR</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover variant="light">
            <tbody>
            {ratesList}
              </tbody>
            </Table>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {this.props.closeModal("ratesList")}}>Close</Button>
        </Modal.Footer>
      </Modal>;
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    conversions: state.conversions
  }
}

export default connect(mapStateToProps)(RatesList);
