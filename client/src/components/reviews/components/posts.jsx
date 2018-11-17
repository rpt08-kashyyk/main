import React from 'react';

const Posts = (props) => (
  <div>
    {props.property.map((post) => 
    	<div key={post._id}>{post.reviews.map((review, i) =>
    		<div key={i + 1}>
          <br></br>
					<img className="profile" src={review.userImage} height="48" width="62"/>
            <b>{review.username}</b><br></br>
            {review.date}<br></br><br></br>
            <div className="comment">{review.comment}</div><br></br><br></br>
          <hr></hr>
    		</div>
    	)}</div>
    )}
  </div>
)

export default Posts;