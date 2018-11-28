
import React from 'react';
import $ from 'jquery';
import Dates from './Dates.jsx'
import Guests from './Guests.jsx'
import CostDetails from './CostDetails.jsx'


class BookingComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      propertyData : {
      "propertyID":1,
      "lattitude":0,
      "longitude":0,
      "dailyRent":100.0,
      "cleaningFees":20,
      "serviceFees":10,
      "taxesAndFees":10,
      "randomPriceDeal":'10% off if you book the entire week',
      "existingReservations": [{"startDate":'2019-11-01',"endDate":'2019-11-05'},{"startDate":'2019-11-10',"endDate":'2019-11-15'}]
      },
      daysReserved: 10
    }
    this.handleBooking = this.handleBooking.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleBooking(){
   console.log("Data to be saved");
  }

  handleChange(e) {
    let ctxt = this;
      console.log(e.target.value);
      $.get('/api/'+e.target.value, function(propertyDataFrmDB){
        console.log(propertyDataFrmDB);
        ctxt.setState({propertyData:propertyDataFrmDB[0]});
      })
  }

  render() {
    return (
      <div className="bookingComponentArea">
      <select onChange={this.handleChange}>
            <option defaultValue>Select Property</option>
            <option defaultValue>1</option>
            <option defaultValue>2</option>
            <option defaultValue>3</option>
            <option defaultValue>4</option>
            <option defaultValue>5</option>
            <option defaultValue>6</option>
            <option defaultValue>7</option>
            <option defaultValue>8</option>
            <option defaultValue>9</option>
            <option defaultValue>10</option>
            <option defaultValue>20</option>
            <option defaultValue>30</option>
            <option defaultValue>40</option>
            <option defaultValue>50</option>
       </select>
        <div className="bottomBorder"><span className="topRent">{'$'+this.state.propertyData.dailyRent} </span><span className="topRentText">per night</span></div>
        <Dates />
        <Guests />
        <CostDetails dailyRent = {this.state.propertyData.dailyRent}
        cleaningFees = {this.state.propertyData.cleaningFees}
        serviceFees = {this.state.propertyData.serviceFees}
        taxesAndFees = {this.state.propertyData.taxesAndFees}
        daysReserved = {this.state.daysReserved}/>
        <div className="bookingButton" onClick={this.handleBooking}><img src="/images/requestBooking.png"/></div>
      </div>
    );
  }

}

export default BookingComponent;


