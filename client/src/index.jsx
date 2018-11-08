import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import PropertyMain from './components/properties/propertyMain.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPropertyId: 1
    }
    console.log('index cosntructor', this.state)
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/api/properties/1',
    //   success: (data) => {
    //     this.setState({
    //       currentPropertyId: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  render () {
    return (
      <div>
        <PropertyMain propertyId={this.state.currentPropertyId}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));