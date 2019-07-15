import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

export default class News extends Component {
  render() {
    return (
      <div>
        <div className="card mb-3">
          <div className="card-header">
            <div className="row align-items-center">
              <div class="col">
                <h4 class="card-header-title">{this.props.title}</h4>
              </div>
            </div>
          </div>
          <div className="card-body">
            <ListGroup variant="flush">
              <ListGroup.Item>
                Tampa Cricket League kick starts Youth coaching and league
              </ListGroup.Item>
              <ListGroup.Item>
                http://www.baynews9.com/content/news/baynews9/news/article.html/content/news/articles/bn9/2015/7/18/first_cricket_fields.html
              </ListGroup.Item>
              <ListGroup.Item>
                Evans Park home to TCL opened on Jul18th
              </ListGroup.Item>
              <ListGroup.Item>
                Racha are the champions of TCL 2019-1 !
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}
