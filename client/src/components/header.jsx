import React from 'react';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { FormGroup, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import {DropdownButton, MenuItem, NavDropdown, Input }  from 'react-bootstrap';
import { LinkContainer } from'react-router-bootstrap';
import Bootstrap from 'bootstrap';

class FirebnbHeader extends React.Component {

  constructor(props) {
    super(props);
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
    this.fillDropdownOptions = this.fillDropdownOptions.bind(this);
    this.items = this.fillDropdownOptions();
  }

  onDropdownSelected(e) {
    this.props.setCurrentProperty(e);
  }

  fillDropdownOptions() {
    let items = [];
    for (let i = 1; i < 21; i++) {
      var path = "/property/"+i;
      items.push( <LinkContainer to={path} key={i}><MenuItem eventKey={i} key={i}>Property-{i}</MenuItem></LinkContainer>);
    }

    return items;
  }

  render() {
      return (
        <Navbar inverse fixedTop fluid={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/"></a>Firebnb
              <img
                src="/AirbnbLogo.jpg"
                width="30"
                height="30"
                className="d-inline-block"
                alt="Airbnb logo"
              />
            </Navbar.Brand>
          </Navbar.Header>

          <Nav pullRight >
              <NavDropdown
                key= {1.1}
                title='Select property'
                id='basic-nav-dropdown'
                onSelect={this.onDropdownSelected}
                pullRight
                >
               {this.fillDropdownOptions()}
              </NavDropdown>
              <NavItem eventKey={1.2} href="#">
                Become a Host
              </NavItem>
              <NavItem eventKey={1.3} href="#">
                Saved
              </NavItem>
              <NavItem eventKey={1.4} href="#">
                Trips
              </NavItem>
              <NavItem eventKey={1.5} href="#">
                Messages
              </NavItem>
              <NavItem eventKey={1.6} href="#">
                Help
              </NavItem>
          </Nav>
        </Navbar>
    );
  }
}

export default FirebnbHeader;

// <MenuItem eventKey={0}>0-{this.props.properties[0].shortDesc}</MenuItem>
//             <MenuItem eventKey={1}>0-{this.props.properties[1].shortDesc}</MenuItem>
//             <MenuItem eventKey={2}>0-{this.props.properties[2].shortDesc}</MenuItem>
//             <MenuItem eventKey={3}>0-{this.props.properties[3].shortDesc}</MenuItem>

// <Form inline>
//      <FormControl type="text" glyph="search" bsSize="large" placeholder="Search" />
//      <FormControl.Feedback>
//      <Glyphicon glyph="star" />
//      </FormControl.Feedback>
//   </Form>


 // <Button bsSize="large" disabled>
 //           <Glyphicon glyph="search" />
 //           Search
 //          </Button>