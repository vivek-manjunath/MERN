/** @format */

import React from 'react';
import PointsTable from './PointsTable';

export default function ByPool(props) {
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <span className="mb-3 standings-pool-name">Pool A</span>
          <PointsTable teams={props.teams.filter(t => t.pool === 'Pool A')} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <span className="mb-3 standings-pool-name">Pool B</span>
          <PointsTable teams={props.teams.filter(t => t.pool === 'Pool B')} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <span className="mb-3 standings-pool-name">Pool B</span>
          <PointsTable teams={props.teams.filter(t => t.pool === 'Pool C')} />
        </div>
      </div>
    </div>
  );
}
