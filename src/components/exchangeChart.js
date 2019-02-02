import React, {Component} from 'react';
import { connect } from "react-redux"
import {Bar} from 'react-chartjs-2'
import Button from 'react-bootstrap/Button'

class ExchangeChart extends Component {

state = {
  data: {}
}

  componentWillMount() {
    this.getData()
  }

  getData = () => {
    let data = {}

      let rates = Object.keys(this.props.conversions.conversions).map(con => {
        if(this.props.conversions.conversions[con] < 10){
        return this.props.conversions.conversions[con]
      } else {
        return null
      }
      })
      let labels = Object.keys(this.props.conversions.conversions).map(con => {
        return con
      })
    data["labels"] = labels
    data["datasets"] = [{
        label: "Exchange Rate to EUR",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: rates,
        }]
        this.setState({data})
    }



  render(){
    return ( <div>
      <Button variant="secondary" onClick={() => {this.props.closeModal("rates")}}>Close</Button>
        < Bar
          data={this.state.data}
        />
      </div>
    )
  }

}

const mapStateToProps = state => {
  return{
    conversions: state.conversions,
  }
}

export default connect(mapStateToProps)(ExchangeChart);
