import React, { Component } from "react";

export default class BattingCard extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h5>Allies</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          <table className="table table-striped table-sm mb-1">
            <thead>
              <tr>
                <th scope="col">Batsmen</th>
                <th scope="col" />
                <th scope="col">Runs</th>
                <th scope="col">Balls</th>
                <th scope="col">SR</th>
                <th scope="col">4s</th>
                <th scope="col">6s</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Vivek Manjunath</th>
                <td>c&nbsp;Uday Kumar&nbsp;b&nbsp;Piyush Joshi</td>
                <td>10</td>
                <td>10</td>
                <td>100</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">Vivek Manjunath</th>
                <td>not out</td>
                <td>10</td>
                <td>10</td>
                <td>100</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">Vivek Manjunath</th>
                <td>not out</td>
                <td>10</td>
                <td>10</td>
                <td>100</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">Extras</th>
                <td>(nb 1, w 2, b 0)</td>
                <td>3</td>
                <td />
                <td />
                <td />
                <td />
              </tr>
              <tr className="table-dark">
                <th scope="row">Total</th>
                <td>(9 wickets; 16 overs)</td>
                <td>98</td>
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </table>
          </div>
        </div>
        
      </div>
    );
  }
}
