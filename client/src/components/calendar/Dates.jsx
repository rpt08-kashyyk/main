import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Button, DropdownButton,MenuItem, Table} from 'react-bootstrap';


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
    const buttonStyle = {
        border: '#222222',
        color: '#222222',
        paddingBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight:0,
        textAlign: 'center',
        background: 'white',
        outline: 0,
        boxShadow: 'none'
      }
    return (



     <Table>
     <thead></thead>
     <tbody>
     <tr>
     <td>
      <DropdownButton
          bsSize="large"
          title="Start Date"
          id="dropdown-size-large"
          style={buttonStyle}
        >
          <MenuItem eventKey="1">1-JAN-2019</MenuItem>
          <MenuItem eventKey="2">2-JAN-2019</MenuItem>
          <MenuItem eventKey="3">3-JAN-2019</MenuItem>
          <MenuItem eventKey="4">4-JAN-2019</MenuItem>
          <MenuItem eventKey="5">5-JAN-2019</MenuItem>
          <MenuItem eventKey="6">6-JAN-2019</MenuItem>
          <MenuItem eventKey="7">7-JAN-2019</MenuItem>
          <MenuItem eventKey="8">8-JAN-2019</MenuItem>
          <MenuItem eventKey="9">9-JAN-2019</MenuItem>
          <MenuItem eventKey="10">10-JAN-2019</MenuItem>
          <MenuItem eventKey="11">11-JAN-2019</MenuItem>
          <MenuItem eventKey="12">12-JAN-2019</MenuItem>
          <MenuItem eventKey="13">13-JAN-2019</MenuItem>
          <MenuItem eventKey="14">14-JAN-2019</MenuItem>
          <MenuItem eventKey="15">15-JAN-2019</MenuItem>
        </DropdownButton></td><td>
        <DropdownButton
          bsSize="large"
          title="End Date"
          id="dropdown-size-large"
          style={buttonStyle}
        >
          <MenuItem eventKey="1">8-JAN-2019</MenuItem>
          <MenuItem eventKey="2">9-JAN-2019</MenuItem>
          <MenuItem eventKey="3">10-JAN-2019</MenuItem>
          <MenuItem eventKey="4">11-JAN-2019</MenuItem>
          <MenuItem eventKey="5">12-JAN-2019</MenuItem>
          <MenuItem eventKey="6">13-JAN-2019</MenuItem>
          <MenuItem eventKey="7">14-JAN-2019</MenuItem>
          <MenuItem eventKey="8">15-JAN-2019</MenuItem>
          <MenuItem eventKey="9">16-JAN-2019</MenuItem>
          <MenuItem eventKey="10">17-JAN-2019</MenuItem>
          <MenuItem eventKey="11">18-JAN-2019</MenuItem>
          <MenuItem eventKey="12">19-JAN-2019</MenuItem>
          <MenuItem eventKey="13">20-JAN-2019</MenuItem>
          <MenuItem eventKey="14">21-JAN-2019</MenuItem>
          <MenuItem eventKey="15">22-JAN-2019</MenuItem>
        </DropdownButton></td>
        </tr>
      </tbody>
      </Table>

    )
  }
}

export default Dates;