/** @format */

import React from 'react';
import {Link} from 'react-router-dom';

const TeamCard = ({teamId, teamName, teamProfileUrl, deleteClickHandler}) => (
  <div key={teamId} className="card bg-light mb-3 border-radius-5px ">
    <div className="card-body text-center">
      <h3>{teamName}</h3>
      <Link className="btn btn-xs btn-primary" to={teamProfileUrl}>
        Team Profile
      </Link>
      <a className="btn btn-xs btn-danger" href="" onClick={deleteClickHandler}>
        Delete Team
      </a>
    </div>
  </div>
);

export default TeamCard;
