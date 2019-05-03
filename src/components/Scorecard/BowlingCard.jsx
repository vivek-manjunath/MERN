import React, { Component } from 'react'

export default class BowlingCard extends Component {
  render() {
    return (
      <div>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Bowler</th>              
              <th scope="col">O</th>
              <th scope="col">R</th>
              <th scope="col">W</th>
              <th scope="col">Econ</th>              
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Vivek Manjunath</th>              
              <td>10</td>
              <td>10</td>
              <td>2</td>
              <td>5.50</td>              
            </tr>
            <tr>
            <th scope="row">Vivek Manjunath</th>              
              <td>10</td>
              <td>10</td>
              <td>2</td>
              <td>5.50</td>
            </tr>
            <tr>
            <th scope="row">Vivek Manjunath</th>              
              <td>10</td>
              <td>10</td>
              <td>2</td>
              <td>5.50</td>
            </tr>                        
          </tbody>
        </table>
      </div>
    )
  }
}
