/** @format */

import React from 'react';

export default function PlayerCard(props) {
  return (
    <div>
      <div className="col-4">
        <div className="bd-callout bd-callout-info">
          <div>
            <h3>{props.playerFullName} 1</h3>
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
