import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import{ FormGroup, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import Bootstrap from 'bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

class ImagesGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyImages: [],
      initialized: false
    }
    this.getImages = this.getImages.bind(this);

  }

  getImages(newPropId) {
    console.log("in get properties details: ", newPropId);
    let serverRoute = '/api/properties/' + newPropId + '/images';
    $.get(serverRoute, data => {
      console.log("images data: ", data)
      this.setState({
        propertyImages: data,
        initialized: true
      });
    });
  }

  componentDidMount() {
    var propId = this.props.propertyId;
    this.getImages(propId);
  }

  componentWillReceiveProps(props) {
    const prevPropId = this.props.propertyId;

    if (props.propertyId !== prevPropId) {
      this.getImages(props.propertyId)
    }
  }

  render () {

    if(!this.state.initialized) {
      return (
          <div>loading images..</div>
        )
    } else {

      const divStyle1 = {
        color: '#5b5b5b5',
        backgroundImage: 'url(' + this.state.propertyImages[0].link  + ')'
      };

      const divStyle2 = {
        color: '#5b5b5b5',
        backgroundImage: 'url(' + (this.state.propertyImages[1].link || props.currentProp.images[0].link) + ')'
      };

      const divStyle3 = {
        color: '#5b5b5b5',
        backgroundImage: 'url(' + (this.state.propertyImages[2].link  || props.currentProp.images[0].link) + ')'
      };

      const divStyle4 = {
        color: '#5b5b5b5',
        backgroundImage: 'url(' + (this.state.propertyImages[3].link  || props.currentProp.images[0].link) + ')'
      };

      const divStyle5 = {
        color: '#5b5b5b5',
        backgroundImage: 'url(' + (this.state.propertyImages[4].link || props.currentProp.images[0].link) + ')'
      };

      return (
          <div className ="imagesWrapper">
            <div className="imageBox imageLarge" style={divStyle1}></div>
            <div className="imageBox imageSmall" style={divStyle2}></div>
            <div className="imageBox imageSmall" style={divStyle3}></div>
            <div className="imageBox imageSmall" style={divStyle4}></div>
            <div className="imageBox imageSmall" style={divStyle5}></div>

            <Button bsStyle="default" bsSize="large" className="jumbo-btn-save"><span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span> Save</Button>
            <Button bsStyle="default" bsSize="large" className="jumbo-btn-share"><span className="glyphicon glyphicon-share" aria-hidden="true"></span> Share</Button>
            <Button bsStyle="default" bsSize="large" className="jumbo-btn-photos">View Photos</Button>
          </div>
      )
    }
  }
}


export default ImagesGrid;
