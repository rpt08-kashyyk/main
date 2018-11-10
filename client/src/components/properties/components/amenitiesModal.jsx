import React from 'react';
import { Modal, Button} from 'react-bootstrap';
import $ from 'jquery';

class AmenitiesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
     }
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose () {
    this.setState({show: false})
    console.log("Modal - in handle Close");
    this.props.hideAmenities();
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Amenities</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Basic</h3>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AmenitiesModal;