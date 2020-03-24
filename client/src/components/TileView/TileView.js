import React, { Component } from 'react';
import {
  Breadcrumb, BreadcrumbItem, Row, Container
} from 'reactstrap';
import TileRow from "../TileRow/TileRow";

class TileView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let tiles = [];

    tiles.push(
      <Breadcrumb tag="nav" listTag="div">
        <BreadcrumbItem className="container">
          <b>{this.props.catName}</b>
        </BreadcrumbItem>
      </Breadcrumb>
    )
    tiles.push(
      <Container>
        <Row>
          <TileRow catType={this.props.catName} />
        </Row>
      </Container>
    );
    return tiles
  }
}

export default TileView;