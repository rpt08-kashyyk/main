import React from 'react';

const Ratings = (props) => (
  <div>
    {props.property.map((listing) =>
    	<div key={listing._id}>
	    	<div className="top-bar">
		    	{`${listing.totalReviews.total} Reviews`}<div className="top-star">{props.star(listing.totalReviews.average)}</div>
	 				<form>
		      	<input
		         placeholder="Search reviews"
		         onChange={(e) => props.search(e.target.value)}
		       	/>
		     	</form>
		    </div>
		    	<hr></hr>
		    <div className="middle-container">
		    	<div className="accuracy">{'Accuracy'}</div>{props.star(listing.accuracy)}
		    	<div className="location">{'Location'}</div>{props.star(listing.location)}
				</div>
		    <div className="middle-container">
		    	<div className="communication">{'Communication'}</div>{props.star(listing.communication)}
		    	<div className="checkin">{'Check-in'}</div>{props.star(listing.checkin)}
		    </div>
		    <div className="middle-container">
		    	<div className="cleanliness">{'Cleanliness'}</div>{props.star(listing.cleanliness)}
		    	<div className="value">{'Value'}</div>{props.star(listing.value)}
		    </div>
    	</div>
    )}
  </div>
)

export default Ratings;