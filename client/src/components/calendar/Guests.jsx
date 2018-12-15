import React from 'react';
import { Button, DropdownButton,MenuItem} from 'react-bootstrap';

class Guests extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const buttonStyle = {
        border: '#222222',
        color: '#222222',
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 30,
        marginLeft: 30,
        marginRight:20,
        textAlign: 'center',
        background: 'white',
        outline: 0,
        boxShadow: 'none'
      };

    return (


      <div>

        <DropdownButton
          bsSize="large"
          title="Number of Guests"
          id="dropdown-size-large"
          style={buttonStyle}
        >
          <MenuItem eventKey="1">1</MenuItem>
          <MenuItem eventKey="2">2</MenuItem>
          <MenuItem eventKey="3">3</MenuItem>
          <MenuItem eventKey="4">4</MenuItem>
          <MenuItem eventKey="5">5</MenuItem>
          <MenuItem eventKey="6">6+</MenuItem>
        </DropdownButton>

      </div>


    );
  }
}

export default Guests;