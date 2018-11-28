import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

//import 'react-datepicker/dist/react-date-picker.css'

class Dates extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      startDate:moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

   handleChange(date) {
    this.setState({
      startDate:date
    });
   }

  render() {
    return (
      <div>
      <div className="headings">Dates
      <div className="left-div"><DatePicker selected = {this.state.startDate} onChange={this.handleChange}/></div>
      <div className="right-div"><DatePicker selected = {this.state.startDate} onChange={this.handleChange}/></div>
      </div>
      </div>
    )
  }
}

export default Dates;