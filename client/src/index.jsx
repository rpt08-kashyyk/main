import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import PropertyMain from './components/properties/propertyMain.jsx';
import ImagesGrid from './components/properties/imagesMain.jsx';
import FirebnbHeader from './components/header.jsx';
import Reviews from './components/reviews/reviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPropertyId: undefined
    }
    this.setCurrentProperty = this.setCurrentProperty.bind(this);
  }

  setCurrentProperty(index) {
    var prevPropId = this.state.currentPropertyId;
    this.setState({ currentPropertyId: index } , function() {
       console.log("In index, setCurrentProperty, state changed from: " + prevPropId + " to: " + this.state.currentPropertyId);
    });

  }

  render () {
    return (
      <Router>
        <div>
          <FirebnbHeader setCurrentProperty={this.setCurrentProperty}/>
            <Route
              path="/property/:prop_id"
              render={ props =>
                <div>
                  <ImagesGrid propertyId={props.match.params.prop_id}/>
                  <Grid>
                    <Row className="show-grid">
                      <Col md={8}>
                        <PropertyMain propertyId={props.match.params.prop_id}/>
                      </Col>
                      <Col md={4}>
                        <h3>Here will be calendar</h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8}>
                        <Reviews propertyId={props.match.params.prop_id}/>
                      </Col>
                    </Row>
                  </Grid>
                </div>
              }
            />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
    <App />
  , document.getElementById('app'));

//<PropertyMain propertyId={this.state.currentPropertyId}/>
// <Route path='/:id' component={ PropertyMain }></Route>