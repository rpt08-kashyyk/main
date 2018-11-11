import React from 'react';
import $ from 'jquery';
import Posts from './components/posts.jsx';
import Ratings from './components/ratings.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      property: [],
      search: []
    }
    this.reviewStars = this.reviewStars.bind(this);
    this.search = this.search.bind(this);
    this.updateReview = this.updateReview.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/api/reviews/' + this.props.propertyId,
      success: (data) => {
        this.setState({
          property: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  reviewStars(num) {
    var full = 'https://i.imgur.com/gPywEat.gif';
    var half = 'https://i.imgur.com/sP8vQe1.gif';
    var empty = 'https://i.imgur.com/crXE6xw.gif';
    if (num === 5) {
      return (
        <div className="star">
          <img src={full} height="20" width="20"/>
          <img src={full} height="20" width="20"/>
          <img src={full} height="20" width="20"/>
          <img src={full} height="20" width="20"/>
          <img src={full} height="20" width="20"/>
        </div>
      )
    }
    if (num === 4.5) {
      return (
        <div className="star">
          <img src={full} height="20" width="20"/>
          <img src={full} height="20" width="20"/>
          <img src={full} height="20" width="20"/>
          <img src={full} height="20" width="20"/>
          <img src={half} height="20" width="20"/>
        </div>
      )
    }
    if (num === 4) {
      return (
        <div className="star">
          <img src={full} height="20" width="20"/>
          <img src={full} height="20" width="20"/>
          <img src={full} height="20" width="20"/>
          <img src={full} height="20" width="20"/>
          <img src={empty} height="20" width="20"/>
        </div>
      )
    }
    if (num === 3.5) {
      return (
        <div className="star">
          <img src={full} height="20" width="20"/>
          <img src={full} height="20" width="20"/>
          <img src={full} height="20" width="20"/>
          <img src={half} height="20" width="20"/>
          <img src={empty} height="20" width="20"/>
        </div>
      )
    }
    if (num === 3) {
      return (
        <div className="star">
          <img src={full} height="20" width="20"/>
          <img src={full} height="20" width="20"/>
          <img src={full} height="20" width="20"/>
          <img src={empty} height="20" width="20"/>
          <img src={empty} height="20" width="20"/>
        </div>
      )
    }
  }

  search(string) {
    fetch('https://localhost:3002/comments/' + string)
    .then((res) => res.json())
    .then((data) =>this.setState({
      search: data
    }));
  }

  updateReview(id) {
    $.get('/api/reviews/' + id, data => {
      this.setState({
        property: data
      });
    });
  }

  componentWillReceiveProps(props) {
    var prevPropId = this.props.propertyId;
    if (props.propertyId !== prevPropId) {
      this.updateReview(props.propertyId);
    }
  }

  render() {
    return (
      <div>
      <Ratings
        property={this.state.property}
        star={this.reviewStars}
        search={this.search}
      />
      <Posts
        property={this.state.property}
      />
      </div>
    )
  }
}

export default Reviews;