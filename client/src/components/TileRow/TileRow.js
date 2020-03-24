import React, { Component } from 'react';
import {
  Card, CardImg, CardTitle, CardSubtitle, CardBody, Col
} from 'reactstrap';
import ProductModal from "../ProductModal";

class TileRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  getBooks = async () => {
    fetch("http://localhost:5000/api/viewBooks")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          data: data
        });
      })
      .catch(err => err);
  };

  componentDidMount() {
    if (this.props.catType == "Books")
      this.getBooks();
    else if (this.props.catType == "Clothing")
      this.getBooks();
    else if (this.props.catType == "Movies")
      this.getBooks();
    else if (this.props.catType == "Kitchen")
      this.getBooks();
    else if (this.props.catType == "Make up")
      this.getBooks();
    else if (this.props.catType == "Pets")
      this.getBooks();
  }

  render() {

    let tiles = []
    const datas = this.state.data;

    for (let j = 0; j < datas.length; j++) {
      tiles.push(
        <Col md="3">
          <Card>
            <CardImg top width="50" height="200" src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt="Card image cap" />
            <CardBody>
              <CardTitle>{datas[j].Title}</CardTitle>
              <CardSubtitle> $ {datas[j].Price}</CardSubtitle>
              <ProductModal buttonLabel="View Details" modalTitle={datas[j].Title} modalText={datas[j].Number} modalImg="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" />
            </CardBody>
          </Card>
        </Col>
      )
    }
    return tiles
  }
}

export default TileRow;