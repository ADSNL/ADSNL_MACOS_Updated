import React, { Component } from 'react';
import {
  Breadcrumb, BreadcrumbItem, Row, Container, Pagination, PaginationItem, PaginationLink,
  Card, CardImg, CardTitle, CardSubtitle, CardBody, Col
} from 'reactstrap';
import ProductModal from "../ProductModal";
import "./TileView.css";

class TileView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      catRange: 0,
      data: [],
      startRange: 1,
      endRange: 24,
      totalPage: 1,
      totalItems: 0
    };
  }

  componentDidMount() {
    if (this.props.catName == "Books") {
      this.setState({ imageURL: "https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" });
      this.getBooks();
    }
    else if (this.props.catName == "Clothing") {
      this.getClothing();
      this.setState({ imageURL: "https://cdn.shopify.com/s/files/1/2143/3217/products/500_d31b0b14-cf17-4c44-8501-9f640df27ac5_grande.png?v=1583268433" });
    }
    else if (this.props.catName == "Movies") {
      this.getviewMovies();
      this.setState({ imageURL: "https://freedesignfile.com/upload/2015/10/Cinema-movie-vector-background-graphics-02.jpg" });
    }
    else if (this.props.catName == "Kitchen") {
      this.getviewKitchen();
      this.setState({ imageURL: "https://www.vector-eps.com/wp-content/gallery/electric-household-appliances-vectors/electric-household-appliance-vector5.jpg" });
    }
    else if (this.props.catName == "Make up") {
      this.getMakeUp();
      this.setState({ imageURL: "https://www.psypost.org/wp-content/uploads/2020/01/woman-putting-on-makeup.jpg" });
    }
    else if (this.props.catName == "Pets") {
      this.getPets();
      this.setState({ imageURL: "http://yourdost-blog-images.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2016/01/03165939/Dogs.jpg" });
    }
  }

  getBooks = async () => {
    await fetch("http://localhost:5000/api/viewBooks/?startRange=" + this.state.startRange + "&endRange=" + this.state.endRange)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.paginationRange(data);
      })
      .catch(err => err);
  };

  getClothing = async () => {
    fetch("http://localhost:5000/api/viewClothing/?startRange=" + this.state.startRange + "&endRange=" + this.state.endRange)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.paginationRange(data);
      })
      .catch(err => err);
  };

  getviewMovies = async () => {
    fetch("http://localhost:5000/api/viewMovies/?startRange=" + this.state.startRange + "&endRange=" + this.state.endRange)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.paginationRange(data);
      })
      .catch(err => err);
  };

  getviewKitchen = async () => {
    fetch("http://localhost:5000/api/viewKitchen/?startRange=" + this.state.startRange + "&endRange=" + this.state.endRange)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.paginationRange(data);
      })
      .catch(err => err);
  };

  getMakeUp = async () => {
    fetch("http://localhost:5000/api/viewMakeUp/?startRange=" + this.state.startRange + "&endRange=" + this.state.endRange)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.paginationRange(data);
      })
      .catch(err => err);
  };

  getPets = async () => {
    fetch("http://localhost:5000/api/viewPets/?startRange=" + this.state.startRange + "&endRange=" + this.state.endRange)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.paginationRange(data);
      })
      .catch(err => err);
  };

  paginationRange(data) {
    this.setState({
      totalPage: TotalPage,
      data: data,
      totalItems: data[0].CatCount
    });

    let Total = this.state.totalItems;
    let TotalPage = Math.ceil(Total / 24);

    this.setState({
      totalPage: TotalPage
    });
  }

  DisplayData(index) {

    let LastItem = index * 24;
    if (LastItem > this.state.totalItems) {
      LastItem = this.state.totalItems;
    }

    let FirstItem = LastItem - 23;

    this.setState({
      startRange: FirstItem,
      endRange: LastItem,
      currentPage: index
    }, () => {
      if (this.props.catName == "Books") {
        this.setState({ imageURL: "https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" });
        this.getBooks();
      }
      else if (this.props.catName == "Clothing") {
        this.getClothing();
        this.setState({ imageURL: "https://cdn.shopify.com/s/files/1/2143/3217/products/500_d31b0b14-cf17-4c44-8501-9f640df27ac5_grande.png?v=1583268433" });
      }
      else if (this.props.catName == "Movies") {
        this.getviewMovies();
        this.setState({ imageURL: "https://freedesignfile.com/upload/2015/10/Cinema-movie-vector-background-graphics-02.jpg" });
      }
      else if (this.props.catName == "Kitchen") {
        this.getviewKitchen();
        this.setState({ imageURL: "https://www.vector-eps.com/wp-content/gallery/electric-household-appliances-vectors/electric-household-appliance-vector5.jpg" });
      }
      else if (this.props.catName == "Make up") {
        this.getMakeUp();
        this.setState({ imageURL: "https://www.psypost.org/wp-content/uploads/2020/01/woman-putting-on-makeup.jpg" });
      }
      else if (this.props.catName == "Pets") {
        this.getPets();
        this.setState({ imageURL: "http://yourdost-blog-images.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2016/01/03165939/Dogs.jpg" });
      }
    });
  }

  render() {
    let tiles = [];
    let pages = [];
    let { currentPage } = this.state;
    let datas = this.state.data;
    let PaginationRange = this.state.totalPage;

    for (let j = 0; j < datas.length; j++) {
      tiles.push(
        <Col md="3" style={{ marginTop: "15px" }}>
          <Card>
            <CardImg top width="50" height="200" src={this.state.imageURL} alt="Card image cap" />
            <CardBody>
              <CardTitle style={{ textAlign: 'center' }} className="colorText">{datas[j].Title}</CardTitle>
              <CardSubtitle style={{ textAlign: 'center' }}>$ {(datas[j].Price).toFixed(2)}</CardSubtitle>
              <ProductModal buttonLabel="View Details"
                modalTitle={datas[j].Title}
                modalText={datas[j].Number}
                modalImg={this.state.imageURL} />
            </CardBody>
          </Card>
        </Col>
      )
    }

    for (let i = 1; i <= PaginationRange; i++) {
      if (this.state.currentPage === i) {
        pages.push(
          <PaginationItem active>
            <PaginationLink onClick={() => this.DisplayData(i)}>{i}</PaginationLink>
          </PaginationItem>
        );
      } else {
        pages.push(
          <PaginationItem>
            <PaginationLink onClick={() => this.DisplayData(i)}>{i}</PaginationLink>
          </PaginationItem>
        );
      }
    }

    return (
      <div>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem className="container">
            <b>{this.props.catName}</b>
          </BreadcrumbItem>
        </Breadcrumb>

        <Container>
          <Pagination aria-label="Page navigation example">
            <PaginationItem>
              <PaginationLink first onClick={() => this.DisplayData(1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous onClick={() => this.DisplayData(this.state.currentPage - 1)} />
            </PaginationItem>
            {pages}
            <PaginationItem>
              <PaginationLink next onClick={() => this.DisplayData(this.state.currentPage + 1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last onClick={() => this.DisplayData(this.state.totalPage)} />
            </PaginationItem>
          </Pagination>
          <Row>
            {tiles}
          </Row>
          <Pagination style={{ marginTop: '10px' }} aria-label="Page navigation example">
            <PaginationItem>
              <PaginationLink first onClick={() => this.DisplayData(1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous onClick={() => this.DisplayData(this.state.currentPage - 1)} />
            </PaginationItem>
            {pages}
            <PaginationItem>
              <PaginationLink next onClick={() => this.DisplayData(this.state.currentPage + 1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last onClick={() => this.DisplayData(this.state.totalPage)} />
            </PaginationItem>
          </Pagination>
        </Container>
      </div>
    );
  }
}

export default TileView;