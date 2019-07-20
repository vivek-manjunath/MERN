/** @format */

import React from 'react';

export default function PlayerCard(props) {
  return (
    <div>
      <div className="col-4">
        <div className="bd-callout bd-callout-info">
          <div>
            <h6>{props.playerFullName}</h6>
          </div>

          <div className="btn-group">
            <button className="btn btn-xs btn-primary">View Profile</button>
            <button className="btn btn-xs btn-default">Edit</button>
            <button
              className="btn-danger btn btn-xs"
              //   onClick={this.deletePlayer.bind(this, player._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
