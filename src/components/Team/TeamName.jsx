import React from 'react';
import { Link } from "react-router-dom";

export default function TeamName(props) {
    return (
        <div>
            <Link to={props.teamProfileUrl}>
                <h6><strong>{props.teamName}</strong></h6>
            </Link>            
        </div>
    )
}
