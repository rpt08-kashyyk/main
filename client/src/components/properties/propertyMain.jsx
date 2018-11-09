import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import $ from 'jquery';
//import examplePropertyData from '../dist/propertyData.js'

import FirebnbHeader from './components/header.jsx';
import Jumbo from './components/jumbo.jsx';
import Property from './components/property.jsx';
import PropertyDesc from './components/propertyDesc.jsx';
import Amenities from './components/amenities.jsx';

class PropertyMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amenities: [],
      currentProperty: {},
      showDesc: false,
      showBtnLabel: "Read more about the space",
      showAmenitiesModal: false,
      hasData: false
    }

     this.getPropertyDetails = this.getPropertyDetails.bind(this);
     this.toggleDescDisplay = this.toggleDescDisplay.bind(this);
     this.getAmenities = this.getAmenities.bind(this);
     this.showAmenitiesModal = this.showAmenitiesModal.bind(this);
     this.handleAmenitiesShow = this.handleAmenitiesShow.bind(this);
     this.handleAmenitiesClose = this.handleAmenitiesClose.bind(this);
     this.setCurrentProperty = this.setCurrentProperty.bind(this);

     console.log("In constructor: ", this.state.properties);

  }

  setCurrentProperty(index) {
    this.setState({ currentProperty: this.state.properties[index] } );
  }

  showAmenitiesModal() {
    this.setState({ showAmenitiesModal: true });
  }

   handleAmenitiesClose() {
    this.setState({ showAmenitiesModal: false });
  }

  handleAmenitiesShow() {
    this.setState({ showAmenitiesModal: true });
  }

  toggleDescDisplay() {
    const show = this.state.showDesc;
    if (!show) {
      this.setState({showBtnLabel: "Hide"});
    }
    else {
      this.setState({showBtnLabel: "Read more about the space"});
    }
    this.setState({showDesc: !show});
  }

  getPropertyDetails(newPropId) {
    console.log("in get properties details: ", newPropId);
    let serverRoute = '/api/properties/' + newPropId;
    $.get(serverRoute, data => {
      console.log("Get properties data: ", data)
      this.setState({
        currentProperty: data,
        hasData: true
      });
    });
  }


  getAmenities() {
    //console.log("in get amenities");
    let serverRoute = '/api/amenitites';
    $.get(serverRoute, data => {
      //console.log("Amenitiesdata: ", data)
      this.setState({
        amenitites: data
      }, function(){/*console.log ("from settingState, currentAmenities :", this.state)*/});
    });
  }

  updateCurrentProperty(index){
    this.setState({
        currentProperty: this.state.properties[index]
      });
  }

  componentDidMount(){
    this.getPropertyDetails(this.props.propertyId);
    console.log("From did mount, state: ", this.state);
  }


  componentWillReceiveProps(props) {
    console.log("!!!!!!!!!!in propertyMain, will receive props", props.propertyId);
    const prevPropId = this.props.propertyId;
    if (props.propertyId !== prevPropId) {
      this.getPropertyDetails(props.propertyId)
    }
  }

  render() {
     const buttonStyle = {

        border: 'none',
        color: 'teal',
        paddingBottom: 20,
        paddingLeft: 0,
        margine: 0,
        textAlign: 'left',
        className: 'infoBtn'
      };

      console.log("render: currentProperty", this.state.currentProperty)

      if (!this.state.hasData)

        return (
          <div>
           <p>Waiting for selection</p>
          </div>

        )
      return (
        <div>
            <Jumbo currentProp={this.state.currentProperty} />
            <Property property={this.state.currentProperty}/>
            <Grid>
              <Row className="show-grid">
                <Col md={7}>
                  {this.state.showDesc && <PropertyDesc currentProperty={this.state.currentProperty} />}
                  <Button bsSize="large" onClick = {this.toggleDescDisplay} style={buttonStyle}>{this.state.showBtnLabel}</Button>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col md={7}>
                  <Button bsSize="large" style={buttonStyle}>Contact Host</Button>
                </Col>
              </Row>
              <Row>
                <Col md={7}>
                  <Amenities currentProp={this.state.currentProperty}/>
                  <Button bsSize="large" onClick = {this.showAmenitiesModal} style={buttonStyle}>Show all amenities</Button>
                </Col>
              </Row>
            </Grid>
          </div>
        )
  }
}

export default PropertyMain;

//     <FirebnbHeader properties={this.state.properties} setCurrentProperty={this.setCurrentProperty}/>



   // return (
   //    <div>
   //      <Header properties={this.state.properties}/>
   //      <Jumbo currentProp={this.state.currentProperty} />
   //      <Property property={this.state.currentProperty}/>
   //      <Grid>
   //        <Row className="show-grid">
   //          <Col md={7}>
   //            {this.state.showDesc && <PropertyDesc currentProperty={this.state.currentProperty} />}
   //            <Button bsSize="large" onClick = {this.toggleDescDisplay} style={buttonStyle}>{this.state.showBtnLabel}</Button>
   //          </Col>
   //        </Row>
   //        <Row className="show-grid">
   //          <Col md={7}>
   //            <Button bsSize="large" style={buttonStyle}>Contact Host</Button>
   //          </Col>
   //        </Row>
   //        <Row>
   //          <Col md={7}>
   //            <Amenities currentProp={this.state.currentProperty}/>
   //            <Button bsSize="large" onClick = {this.showAmenitiesModal} style={buttonStyle}>Show all amenities</Button>
   //          </Col>
   //        </Row>
   //      </Grid>
   //    </div>

   //  )