import React from 'react';
import { Modal, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import $ from 'jquery';

function amenitiesEntry({ children }, ) {
  return (
    <li className="list-group-item" >
      {children}
    </li>
  );
}



class AmenitiesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      amenities: [],
      initialized: false
     }
    this.handleClose = this.handleClose.bind(this);
    this.getAmentitiesList = this.getAmentitiesList.bind(this);
    this.categoryAmenitiesDisplay = this.categoryAmenitiesDisplay.bind(this);
  }

  componentDidMount() {
    this.getAmentitiesList()
  }

  handleClose () {
    this.setState({show: false})
    console.log("Modal - in handle Close");
    this.props.hideAmenities();
  }

  getAmentitiesList() {
    let serverRoute = '/api/amenities';
    $.get(serverRoute, data => {
      console.log("Get properties data: ", data)
      this.setState({
        amenities: data,
        initialized: true
      }, function(){console.log("amenities:", data)});
    });
  }

  categoryAmenitiesDisplay() {
    let categories = [];
    let structuredAmenities = {};
    let cats = [];

    this.state.amenities.map(amenity=> {
      if(!categories.includes(amenity.type))
        categories.push(amenity.type);
    });


    let notIncludedGroupItems = [];

    categories.map(cat =>
    {
      let groupItems = [];
      let i = 0;
      this.state.amenities.map (amenity => {
        i++;
        if(amenity.type === cat) {
           if(this.props.currentProperty.amenities.includes(amenity._id)) {
              groupItems.push(
                <ListGroupItem key={i} style={{borderLeft: 'none', borderRight: 'none', padding: 15}}>
                    <div>
                        <h4 style={{fontSize: 18}}>{amenity.desc}</h4>
                        <h5>{amenity.additional}</h5>
                    </div>
                </ListGroupItem>)
            } else {
              notIncludedGroupItems.push(
                <ListGroupItem key={i} style={{borderLeft: 'none', borderRight: 'none', padding: 15}}>
                    <div>
                        <h4 style={{fontSize: 18}}>{amenity.desc}</h4>
                        <h5>{amenity.additional}</h5>
                    </div>
                </ListGroupItem>)
            }
        }
      });
      cats.push(<ListGroup style={{fontWeight: 700, fontSize: 20, paddingBottom: 15}}>{cat}
          {groupItems}
        </ListGroup>);
    });
      cats.push(<ListGroup style={{fontWeight: 700, fontSize: 20, paddingBottom: 15}}>{'not included'}
            {notIncludedGroupItems}
          </ListGroup>);

    return cats;
  }

  render() {

    if (!this.state.initialized){
      return (<div></div>)
    } else {
        return (
          <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{fontWeight: 700}}>Amenities</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.categoryAmenitiesDisplay()}
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
    }
  }


export default AmenitiesModal;
