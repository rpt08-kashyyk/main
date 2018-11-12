import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import{ FormGroup, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import Bootstrap from 'bootstrap';

class Property extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
      return (
      <Grid>
        <Row className="show-grid">
          <Col md={8}>
            <div>
                <h3>
                  <strong>ENTIRE HOUSE</strong>
                </h3>
                <div>
                  <h1 style={{ padding: 0, marginBottom: 20, minWidth: 500, maxWidth: 600}}>
                    {this.props.property.shortDesc}
                  </h1>
                </div>
                <div>
                  <h3 style={{ padding: 0, marginBottom: 20, minWidth: 500, maxWidth: 600}}>
                    {this.props.property.address.city}
                  </h3>
                </div>
                <div style={{ padding: 5, marginBottom: 20, minWidth: 500, maxWidth: 600}}>
                  <Row className="show-grid">
                    <Col md={2}>
                      <p>
                        {this.props.property.guests} guests
                      </p>
                   </Col>
                   <Col md={3}>
                      <p>
                        {this.props.property.bedrooms} bedrooms
                      </p>
                   </Col>
                   <Col md={2}>
                      <p>
                        {this.props.property.beds} beds
                      </p>
                   </Col>
                   <Col md={2}>
                      <p>
                        {this.props.property.beds} baths
                      </p>
                 </Col>
                </Row>
              </div>
              <p className="prop-desc">
                {this.props.property.desc1}
              </p>
            </div>
          </Col>
        </Row>
      </Grid>
      )
  }
}

// Property.propTypes = {
//   property: React.PropTypes.object.isRequired
// };


export default Property;