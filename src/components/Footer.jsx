/** @format */

import React, {Component} from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons'

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer id="footer">
          <div class="row">
            <div class="col-lg-12">
              <ul class="list-unstyled">
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
              </ul>
              <p>
                Developed by{' '}
                <a href="mailto:vivekngd@gmail.com">Vivek Manjunath</a>
              </p>
              <p>All rights reserved by TCL.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
