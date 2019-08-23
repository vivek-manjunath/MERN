/** @format */

import React from 'react';
import PointsTable from './PointsTable';

export default function ByPool(props) {
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <h5>Pool A</h5>
          <PointsTable teams={props.teams.filter(t => t.pool === 'Pool A')} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <h5>Pool B</h5>
          <PointsTable teams={props.teams.filter(t => t.pool === 'Pool B')} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <h5>Pool C</h5>
          <PointsTable teams={props.teams.filter(t => t.pool === 'Pool C')} />
        </div>
      </div>
    </div>
  );
}
