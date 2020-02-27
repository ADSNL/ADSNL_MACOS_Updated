import React from 'react';
//import './Footer.css';
import {
    Card, Button, CardImg, CardTitle, CardDeck,
    CardSubtitle, CardBody, Breadcrumb, BreadcrumbItem
} from 'reactstrap';

const TopSellingBooks = (props) => (
    <div>
        <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem className="container" tag="a" href="#"><b>Top Selling Books</b></BreadcrumbItem>
        </Breadcrumb>
        <div className="container">
            <CardDeck>
                <Card>
                    <CardImg top width="50" height="200" src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt="Card image cap" />
                    <CardBody>
<CardTitle><b>{props.data.Book_Title}</b></CardTitle>
                        <CardSubtitle>{props.data.ISBN_10}</CardSubtitle>
                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="50" height="200" src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt="Card image cap" />
                    <CardBody>
                        <CardTitle><b>Book 2</b></CardTitle>
                        <CardSubtitle>$ 39.99</CardSubtitle>
                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="50" height="200" src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt="Card image cap" />
                    <CardBody>
                        <CardTitle><b>Book 3</b></CardTitle>
                        <CardSubtitle>$ 39.99</CardSubtitle>
                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="50" height="200" src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt="Card image cap" />
                    <CardBody>
                        <CardTitle><b>Book 4</b></CardTitle>
                        <CardSubtitle>$ 39.99</CardSubtitle>
                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="50" height="200" src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt="Card image cap" />
                    <CardBody>
                        <CardTitle><b>Book 5</b></CardTitle>
                        <CardSubtitle>$ 39.99</CardSubtitle>
                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>
            </CardDeck>
        </div>
    </div>
)

export default TopSellingBooks;
