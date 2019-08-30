/** @format */

import React, {Component} from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons'

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer class="footer">
          <div class="container">
            <p class="">
              <span className="float-left">
                © 2019 Copyright:&nbsp;
                <strong>Tampa Cricket League</strong>
              </span>
              <span className="float-right developer-logo">
                Designed and developed by:&nbsp;
                <strong>Vivek Manjunath</strong>
              </span>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}
