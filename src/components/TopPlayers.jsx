import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default class TopPlayers extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div class="ibox">
          <div class="ibox-content">
            <h4>Most Valuable Players</h4>
            <table class="table table-stripped small m-t-md">
              <tbody>
                <tr>
                  <td class="no-borders">
                    <i class="fa fa-circle text-navy" />
                  </td>
                  <td class="no-borders">Example element 1</td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-circle text-navy" />
                  </td>
                  <td>Example element 2</td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-circle text-navy" />
                  </td>
                  <td>Example element 3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
