import React from 'react';


//import './Footer.css';
import {
    Card, Button, CardImg, CardTitle, CardDeck,
    CardSubtitle, CardBody, Breadcrumb, BreadcrumbItem
} from 'reactstrap';

const TopSellingMovies = props => (
    <div>
        <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem className="container" tag="a" href="#"><b>Top Selling Movies</b></BreadcrumbItem>
        </Breadcrumb>
        <div className="container">
            <CardDeck>
                <Card>
                    <CardImg top width="50" height="200" src="https://freedesignfile.com/upload/2015/10/Cinema-movie-vector-background-graphics-02.jpg" alt="Card image cap" />
                    <CardBody>

                        {/* <CardTitle onClick={activateLasers}><b>{props.clothing[0].Clothing_Name}</b></CardTitle> */}
                        <CardTitle><b>{props.data[0].Movie_Title}</b></CardTitle>
                        <CardSubtitle>$ {props.data[0].Price}</CardSubtitle>

                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="50" height="200" src="https://freedesignfile.com/upload/2015/10/Cinema-movie-vector-background-graphics-02.jpg" alt="Card image cap" />
                    <CardBody>

                        {/* <CardTitle onClick={activateLasers}><b>{props.clothing[0].Clothing_Name}</b></CardTitle> */}
                        <CardTitle><b>{props.data[1].Movie_Title}</b></CardTitle>
                        <CardSubtitle>$ {props.data[1].Price}</CardSubtitle>

                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>

                <Card>
                    <CardImg top width="50" height="200" src="https://freedesignfile.com/upload/2015/10/Cinema-movie-vector-background-graphics-02.jpg" alt="Card image cap" />
                    <CardBody>

                        {/* <CardTitle onClick={activateLasers}><b>{props.clothing[0].Clothing_Name}</b></CardTitle> */}
                        <CardTitle><b>{props.data[2].Movie_Title}</b></CardTitle>
                        <CardSubtitle>$ {props.data[2].Price}</CardSubtitle>

                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>

                <Card>
                    <CardImg top width="50" height="200" src="https://freedesignfile.com/upload/2015/10/Cinema-movie-vector-background-graphics-02.jpg" alt="Card image cap" />
                    <CardBody>

                        {/* <CardTitle onClick={activateLasers}><b>{props.clothing[0].Clothing_Name}</b></CardTitle> */}
                        <CardTitle><b>{props.data[3].Movie_Title}</b></CardTitle>
                        <CardSubtitle>$ {props.data[3].Price}</CardSubtitle>

                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>
            </CardDeck>
        </div>
    </div>
)

export default TopSellingMovies;
