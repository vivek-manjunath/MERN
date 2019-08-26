/** @format */

import React from 'react';
import {Link} from 'react-router-dom';

const TeamCard = ({teamId, teamName, teamProfileUrl, deleteClickHandler}) => (
  <div key={teamId} className="card bg-light mb-3 border-radius-5px ">
    <div className="card-body text-center shadow h-100">
      <div className="h5 mb-0 font-weight-bold text-gray-800 mb-2">{teamName}</div>
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
