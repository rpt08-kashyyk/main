import React from 'react';
import { ListGroup, Grid, Row, Col, Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const headerStyle = {
  position: 'relative',
  left: '15px',
  text: 'strong',
  fontWeight:'bold',
  sontSize: 25
};

const tableStyle = {
  position: 'relative',
  left: '15px'
};

var Amenities = (props) => (

  <div>
    <div>
      <h3 style={headerStyle}>Amenities</h3>
    </div>
    <Table style={tableStyle} responsive>
     <tbody>
        <tr>
          <td><span className="glyphicon glyphicon-home" aria-hidden="true"></span> Free parking on premises</td>
          <td><span className="glyphicon glyphicon-glass" aria-hidden="true"></span> Dining room</td>
        </tr>
        <tr>
          <td><span className="glyphicon glyphicon-lock" aria-hidden="true"></span> Private outdoor pool</td>
          <td><span className="glyphicon glyphicon-cutlery" aria-hidden="true"></span> Fully-equiped kitchen</td>
        </tr>
      </tbody>
    </Table>
  </div>
);

Amenities.propTypes = {
  currentProp: PropTypes.object.isRequired
}

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
// Itineraries.propTypes = {
//   itineraries: React.PropTypes.array.isRequired
// };

// export default Itineraries;








// class Amenities extends React.Component {

//   constructor(props) {
//     super(props);
//   }

//   render() {
//     amenities = this.props.amenities;
//     listAmenities = [];
//     length = (amenities.basic.length < 6) ? amenities.basic.length : 6;
//     for (i=0; i<length ; i++){
//       listAmenities.push(<ListGroupItem>amenities.basic.desc</ListGroupItem>)
//     }


//       return (
//       <Grid>
//         <Row className="show-grid">

//         <Col md={7}>
//             <h3>
//               <strong>Amenities</strong>
//             </h3>
//             <Col md={3}>
//               {listAmenities}
//             </Col>
//           </Col>
//         </Row>
//       </Grid>
//     )
//   }
// }

export default Amenities;
