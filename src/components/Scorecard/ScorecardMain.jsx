import React, { Component } from 'react'
import BattingCard from './BattingCard';
import BowlingCard from './BowlingCard';

export default class ScorecardMain extends Component {
  render() {
    return (
      <div>
          <div className="row">
            <div className="col-md-12">
            <BattingCard></BattingCard>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
            <BowlingCard></BowlingCard>
            </div>
          </div>        
      </div>
    )
  }
}
