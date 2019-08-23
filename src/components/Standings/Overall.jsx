/** @format */

import React from 'react';
import PointsTable from './PointsTable';

export default function Overall(props) {
  return (
    <div>
      <PointsTable teams={props.teams} />
    </div>
  );
}
