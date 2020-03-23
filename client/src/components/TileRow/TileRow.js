import React, { Component } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Media, Card, CardImg, CardTitle, CardDeck,
  CardSubtitle, CardBody, Breadcrumb, BreadcrumbItem, Col, Row, Box
} from 'reactstrap';
import ProductModal from "../ProductModal";

class TileRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  getBooks = async () => {
    fetch("http://localhost:5000/api/viewBooks")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          books: data
        });
      })
      .catch(err => err);
  };

  componentDidMount() {
    this.getBooks();
  }

  render() {

    let tiles = []
    const datas = this.state.books;
    
    for (let j = 0; j < datas.length; j++) {
      tiles.push(
        <Col md="3">
          <Card>
            <CardImg top width="50" height="200" src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt="Card image cap" />
            <CardBody>
              <CardTitle>{datas[j].Book_Title}</CardTitle>
              <CardSubtitle> $ {datas[j].Unit_Price}</CardSubtitle>
              <ProductModal buttonLabel="View Details" modalTitle={datas[j].Book_Title} modalText={datas[j].ISBN_10} modalImg="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" />
            </CardBody>
          </Card>
        </Col>
      )
    }

    return tiles
  }
}

export default TileRow;