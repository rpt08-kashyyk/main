import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PropertyMain from './components/properties/propertyMain.jsx';
import FirebnbHeader from './components/header.jsx'

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
                  exact
                  path="/property/:prop_id"
                  render={props => {
                    let propertyId = props.match.params.prop_id;
                    return <PropertyMain propertyId={propertyId} />;
                  }}
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