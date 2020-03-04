import React from "react";
import Cards from "../Cards";
//import './Footer.css';
import {
  Card, Button, CardImg, CardTitle, CardDeck,
  CardSubtitle, CardBody, Breadcrumb, BreadcrumbItem
} from 'reactstrap';

const TopSellingBooks = props => (
  <div>
    <Breadcrumb tag="nav" listTag="div">
      <BreadcrumbItem className="container" tag="a" href="#">
        <b>Top Selling Books</b>
      </BreadcrumbItem>
    </Breadcrumb>

    {/* <div className="container">
    <CardDeck>
      {
        props.data.map((item, index) => {
          <Cards key={index} data={item} />
        })
      }
    </CardDeck>
    </div> */}

    <div className="container">
      <CardDeck>
        <Card>
          <CardImg top width="50" height="200" src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt="Card image cap" /> 
            <CardBody>
              <CardTitle>{props.data[0].Book_Title}</CardTitle>
              <CardSubtitle>{props.data[0].ISBN_10}</CardSubtitle>
              <Button>Add to Cart</Button>
            </CardBody>
        </Card>

        <Card>
          <CardImg top width="50" height="200" src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt="Card image cap" /> 
            <CardBody>
              <CardTitle>{props.data[1].Book_Title}</CardTitle>
              <CardSubtitle>{props.data[1].ISBN_10}</CardSubtitle>
              <Button>Add to Cart</Button>
            </CardBody>
        </Card> 

        <Card>
          <CardImg top width="50" height="200" src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt="Card image cap" /> 
            <CardBody>
              <CardTitle>{props.data[2].Book_Title}</CardTitle>
              <CardSubtitle>{props.data[2].ISBN_10}</CardSubtitle>
              <Button>Add to Cart</Button>
            </CardBody>
        </Card> 

        <Card>
          <CardImg top width="50" height="200" src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt="Card image cap" /> 
            <CardBody>
              <CardTitle>{props.data[3].Book_Title}</CardTitle>
              <CardSubtitle>{props.data[3].ISBN_10}</CardSubtitle>
              <Button>Add to Cart</Button>
            </CardBody>
        </Card> 
      </CardDeck>
    </div>
  
        {/* <Cards data={props.data} /> */}
        
    
  </div>
);

export default TopSellingBooks;
