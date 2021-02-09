import React, { Component } from 'react';
import {
  Breadcrumb, BreadcrumbItem, Row, Container, Pagination, PaginationItem, PaginationLink,
  Card, CardImg, CardTitle, CardSubtitle, CardBody, Col, FormGroup, Form, Input, Button
} from 'reactstrap';
import ProductModal from "../ProductModal";
import "./TileView.css";

class TileView extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      catRange: 0,
      data: [],
      startRange: 1,
      endRange: 24,
      totalPage: 1,
      totalItems: 0,
      searchTerm: '',
      searchResults: []
    }; 
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      categoryName: this.props.catName
    }, () => {
      if (this._isMounted) {
        this.LoadCatData();
      }
    });
  }

  componentDidUpdate() {
    if (this.state.categoryName !== this.props.catName && this._isMounted) {
      this.setState({
        categoryName: this.props.catName
      }, () => {
        if (this._isMounted) {
          this.LoadCatData();
          this._isMounted = false;
        }
      });
    }
  }
  componentWillReceiveProps() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  LoadCatData() {

    if (this.props.catName == "Books" || this.state.categoryName == "Books") {
      this.setState({ imageURL: "https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" });
      this.searchTerm = '';
      this.getBooks();
    }
    else if (this.props.catName == "Clothing" || this.state.categoryName == "Clothing") {
      this.searchTerm = '';
      this.getClothing();
      this.setState({ imageURL: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80" });
    }
    else if (this.props.catName == "Movies" || this.state.categoryName == "Movies") {
      this.searchTerm = '';
      this.getviewMovies();
      this.setState({ imageURL: "https://freedesignfile.com/upload/2015/10/Cinema-movie-vector-background-graphics-02.jpg" });
    }
    else if (this.props.catName == "Kitchen" || this.state.categoryName == "Kitchen") {
      this.searchTerm = '';
      this.getviewKitchen();
      this.setState({ imageURL: "https://www.vector-eps.com/wp-content/gallery/electric-household-appliances-vectors/electric-household-appliance-vector5.jpg" });
    }
    else if (this.props.catName == "Make up" || this.state.categoryName == "Make up") {
      this.searchTerm = '';
      this.getMakeUp();
      this.setState({ imageURL: "https://img.jakpost.net/c/2019/12/09/2019_12_09_83333_1575827116._large.jpg" });
    }
    else if (this.props.catName == "Pets" || this.state.categoryName == "Pets") {
      this.searchTerm = '';
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
    await fetch("http://localhost:5000/api/viewClothing/?startRange=" + this.state.startRange + "&endRange=" + this.state.endRange)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.paginationRange(data);
      })
      .catch(err => err);
  };

  getviewMovies = async () => {
    await fetch("http://localhost:5000/api/viewMovies/?startRange=" + this.state.startRange + "&endRange=" + this.state.endRange)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.paginationRange(data);
      })
      .catch(err => err);
  };

  getviewKitchen = async () => {
    await fetch("http://localhost:5000/api/viewKitchen/?startRange=" + this.state.startRange + "&endRange=" + this.state.endRange)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.paginationRange(data);
      })
      .catch(err => err);
  };

  getMakeUp = async () => {
    await fetch("http://localhost:5000/api/viewMakeUp/?startRange=" + this.state.startRange + "&endRange=" + this.state.endRange)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.paginationRange(data);
      })
      .catch(err => err);
  };

  getPets = async () => {
    await fetch("http://localhost:5000/api/viewPets/?startRange=" + this.state.startRange + "&endRange=" + this.state.endRange)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.paginationRange(data);
      })
      .catch(err => err);
  };

  getSearchResults = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/search/?search=" + this.searchTerm + "&category=" + this.props.catName)
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({
          searchResults: data
        });
      })
      .catch(err => err);
  }

  handleChange = (e) => {
    this.searchTerm = e.target.value;
    console.log(this.searchTerm);
  }

  paginationRange(data) {
    this.setState({
      //totalPage: TotalPage,
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
    }, () => { this.LoadCatData() });
  }

  render() {
    let tiles = [];
    let pages = [];
    let { currentPage } = this.state;
    let datas = this.state.data;
    let PaginationRange = this.state.totalPage;
    const searchDataResults = this.state.searchResults;
    const searchTiles = [];

    for (let j = 0; j < searchDataResults.length; j++) {
      searchTiles.push(
        <Col md="3" style={{ marginTop: "15px" }}>
          <Card>
            <CardImg top width="50" height="200" src={this.state.imageURL} alt="Card image cap" />
            <CardBody>
              <CardTitle style={{ textAlign: 'center' }} className="colorText">{searchDataResults[j].Title}</CardTitle>
              <CardSubtitle style={{ textAlign: 'center' }}>$ {(searchDataResults[j].Price).toFixed(2)}</CardSubtitle>
              <ProductModal buttonLabel="View Details"
                productData={searchDataResults[j]}
                modalImg={this.state.imageURL} />
            </CardBody>
          </Card>
        </Col>
      )
    }

    for (let j = 0; j < datas.length; j++) {
      tiles.push(
        <Col md="3" style={{ marginTop: "15px" }}>
          <Card>
            <CardImg top width="50" height="200" src={this.state.imageURL} alt="Card image cap" />
            <CardBody>
              <CardTitle style={{ textAlign: 'center' }} className="colorText">{datas[j].Title}</CardTitle>
              <CardSubtitle style={{ textAlign: 'center' }}>$ {(datas[j].Price).toFixed(2)}</CardSubtitle>
              <ProductModal buttonLabel="View Details"
                productData={datas[j]}
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
          <Form action="" onSubmit={this.getSearchResults} >
            <Row>
              <Col>
                <FormGroup>
                  <Input type="text" name="search"
                    placeholder="Search..."
                    className="search-input"
                    autoComplete="on"
                    onChange={this.handleChange} />
                </FormGroup>
              </Col>
              <Col>
                <Button id="searchBtn" className="search-btn btn-primary">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Container>

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
            {
              ((this.searchTerm == undefined) || (this.searchTerm == '')) ? tiles : searchTiles
            }
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
      </div >
    );
  }
}

export default TileView;