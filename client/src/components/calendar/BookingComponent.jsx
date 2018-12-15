
import React from 'react';
import $ from 'jquery';
import Dates from './Dates.jsx'
import Guests from './Guests.jsx'
import CostDetails from './CostDetails.jsx'
import { Button, DropdownButton,MenuItem} from 'react-bootstrap';


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
    //this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/api/calendar/' + this.props.propertyId,
      success: (data) => {
        //console.log("from front end booking component",data[0].dailyRent, data);
        this.setState({
          propertyData: data[0]
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleBooking(){
   console.log("Data to be saved");
  }

  /*handleChange(e) {
    let ctxt = this;
      console.log(e.target.value);
      $.get('/api/'+e.target.value, function(propertyDataFrmDB){
        console.log(propertyDataFrmDB);
        ctxt.setState({propertyData:propertyDataFrmDB[0]});
      })
  }*/

  render() {
   const buttonStyle = {
        border: 'none',
        color: 'white',
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 30,
        marginRight:20,
        textAlign: 'center',
        className: 'infoBtn',
        background: '#FC5C63',
        outline: 0,
        boxShadow: 'none'
      };


    return (
      <div className="bookingComponentArea">
        <div className="bottomBorder"><span className="topRent">{'$'+this.state.propertyData.dailyRent} </span><span className="topRentText">per night</span></div>
        <div><Dates /></div>
        <div><Guests /></div>
        <div><CostDetails dailyRent = {this.state.propertyData.dailyRent}
        cleaningFees = {this.state.propertyData.cleaningFees}
        serviceFees = {this.state.propertyData.serviceFees}
        taxesAndFees = {this.state.propertyData.taxesAndFees}
        daysReserved = {this.state.daysReserved}/></div>
        <div>
         <Button bsSize="large" bsStyle="danger"onClick = {this.handleBooking} style={buttonStyle}>Request to book</Button>
         </div>
      </div>
    );
  }

}

export default BookingComponent;


