import React, { Component } from 'react';
import {
  Card, CardImg, CardTitle, CardSubtitle, CardBody, Col
} from 'reactstrap';
import ProductModal from "../ProductModal";
import "./TileRow.css";

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

  getClothing = async () => {
    fetch("http://localhost:5000/api/viewClothing")
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

  getviewMovies = async () => {
    fetch("http://localhost:5000/api/viewMovies")
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

  getviewKitchen = async () => {
    fetch("http://localhost:5000/api/viewKitchen")
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

  getMakeUp = async () => {
    fetch("http://localhost:5000/api/viewMakeUp")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          data: data,
          imageURL: ''
        });
      })
      .catch(err => err);
  };

  getPets = async () => {
    fetch("http://localhost:5000/api/viewPets")
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
    if (this.props.catType == "Books") {
      this.setState({ imageURL: "https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" });
      this.getBooks();
    }
    else if (this.props.catType == "Clothing") {
      this.getClothing();
      this.setState({ imageURL: "https://cdn.shopify.com/s/files/1/2143/3217/products/500_d31b0b14-cf17-4c44-8501-9f640df27ac5_grande.png?v=1583268433" });
    }
    else if (this.props.catType == "Movies") {
      this.getviewMovies();
      this.setState({ imageURL: "https://freedesignfile.com/upload/2015/10/Cinema-movie-vector-background-graphics-02.jpg" });
    }
    else if (this.props.catType == "Kitchen") {
      this.getviewKitchen();
      this.setState({ imageURL: "https://www.vector-eps.com/wp-content/gallery/electric-household-appliances-vectors/electric-household-appliance-vector5.jpg" });
    }
    else if (this.props.catType == "Make up") {
      this.getMakeUp();
      this.setState({ imageURL: "https://www.vector-eps.com/wp-content/gallery/electric-household-appliances-vectors/electric-household-appliance-vector5.jpg" });
    }
    else if (this.props.catType == "Pets") {
      this.getPets();
      this.setState({ imageURL: "http://yourdost-blog-images.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2016/01/03165939/Dogs.jpg" });
    }
  }

  render() {
    let tiles = []
    const datas = this.state.data;

    for (let j = 0; j < datas.length; j++) {
      tiles.push(
        <Col md="3" style={{ marginTop: "15px" }}>
          <Card>
            <CardImg top width="50" height="200" src={this.state.imageURL} alt="Card image cap" />
            <CardBody>
              <CardTitle className="colorText">{datas[j].Title}</CardTitle>
              <CardSubtitle> $ {datas[j].Price}</CardSubtitle>
              <ProductModal buttonLabel="View Details" modalTitle={datas[j].Title} modalText={datas[j].Number} modalImg={this.state.imageURL} />
            </CardBody>
          </Card>
        </Col>
      )
    }
    return tiles
  }
}

export default TileRow;