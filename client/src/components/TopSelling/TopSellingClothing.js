import React from 'react';


//import './Footer.css';
import {
    Card, Button, CardImg, CardTitle, CardDeck,
    CardSubtitle, CardBody, Breadcrumb, BreadcrumbItem
} from 'reactstrap';

const TopSellingClothing = props => (
    <div>
        {/* {console.log(props.data[0])} */}
        <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem className="container" tag="a" href="#"><b>Top Selling Clothes</b></BreadcrumbItem>
        </Breadcrumb>
        <div className="container">
            <CardDeck>
                <Card>
                    <CardImg top width="50" height="200" src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80" alt="Card image cap" />
                    <CardBody>

                        {/* <CardTitle onClick={activateLasers}><b>{props.clothing[0].Clothing_Name}</b></CardTitle> */}
                        <CardTitle><b>{props.data[0].Clothing_Name}</b></CardTitle>

                        <CardSubtitle> $ {(props.data[0].Price).toFixed(2)}</CardSubtitle>
                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>

                <Card>
                    <CardImg top width="50" height="200" src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80" alt="Card image cap" />
                    <CardBody>
                        <CardTitle><b>{props.data[1].Clothing_Name}</b></CardTitle>
                        <CardSubtitle> $ {(props.data[1].Price).toFixed(2)}</CardSubtitle>
                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>

                <Card>
                    <CardImg top width="50" height="200" src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80" alt="Card image cap" />
                    <CardBody>
                        <CardTitle><b>{props.data[2].Clothing_Name}</b></CardTitle>
                        <CardSubtitle> $ {(props.data[2].Price).toFixed(2)}</CardSubtitle>
                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>

                <Card>
                    <CardImg top width="50" height="200" src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80" alt="Card image cap" />
                    <CardBody>
                        <CardTitle><b>{props.data[3].Clothing_Name}</b></CardTitle>
                        <CardSubtitle> $ {(props.data[3].Price).toFixed(2)}</CardSubtitle>
                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>
            </CardDeck>
        </div>
    </div>
)

export default TopSellingClothing;
