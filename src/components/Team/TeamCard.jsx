import React from "react";
import { Link } from "react-router-dom";

export default function TeamCard(props) {
  return (
    <div key={props.teamId} className="ibox">
      <div className="ibox-content text-center">
        <h3>{props.teamName}</h3>
        <Link
          className="btn btn-sm btn-primary"
         to={props.teamProfileUrl}
        >
          Team Profile
        </Link>
        <a
          className="btn btn-sm btn-danger"
          href=""
          onClick={props.deleteClickHandler}
        >
          Delete Team
        </a>
      </div>
    </div>
  );
}
