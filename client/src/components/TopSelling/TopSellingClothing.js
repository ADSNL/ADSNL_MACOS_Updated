import React from 'react';


//import './Footer.css';
import {
    Card, Button, CardImg, CardTitle, CardDeck,
    CardSubtitle, CardBody, Breadcrumb, BreadcrumbItem
} from 'reactstrap';

const TopSellingClothing = props => (
    <div>
        <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem className="container" tag="a" href="#"><b>Top Selling Cloths</b></BreadcrumbItem>
        </Breadcrumb>
        <div className="container">
        <CardDeck>
                <Card>
                    <CardImg top width="50" height="200" src="https://cdn.shopify.com/s/files/1/2143/3217/products/500_d31b0b14-cf17-4c44-8501-9f640df27ac5_grande.png?v=1583268433" alt="Card image cap" />
                    <CardBody>
                  
                        {/* <CardTitle onClick={activateLasers}><b>{props.clothing[0].Clothing_Name}</b></CardTitle> */}
                        <CardTitle><b>{props.clothing[0].Clothing_Name}</b></CardTitle>
                      
                        <CardSubtitle> $ {props.clothing[0].Price}</CardSubtitle>
                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>

                <Card>
                    <CardImg top width="50" height="200" src="https://cdn.shopify.com/s/files/1/2143/3217/products/500_d31b0b14-cf17-4c44-8501-9f640df27ac5_grande.png?v=1583268433" alt="Card image cap" />
                    <CardBody>
                        <CardTitle><b>{props.clothing[1].Clothing_Name}</b></CardTitle>
                        <CardSubtitle> $ {props.clothing[1].Price}</CardSubtitle>
                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>

                <Card>
                    <CardImg top width="50" height="200" src="https://cdn.shopify.com/s/files/1/2143/3217/products/500_d31b0b14-cf17-4c44-8501-9f640df27ac5_grande.png?v=1583268433" alt="Card image cap" />
                    <CardBody>
                        <CardTitle><b>{props.clothing[2].Clothing_Name}</b></CardTitle>
                        <CardSubtitle> $ {props.clothing[2].Price}</CardSubtitle>
                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>

                <Card>
                    <CardImg top width="50" height="200" src="https://cdn.shopify.com/s/files/1/2143/3217/products/500_d31b0b14-cf17-4c44-8501-9f640df27ac5_grande.png?v=1583268433" alt="Card image cap" />
                    <CardBody>
                        <CardTitle><b>{props.clothing[3].Clothing_Name}</b></CardTitle>
                        <CardSubtitle> $ {props.clothing[3].Price}</CardSubtitle>
                        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                        <Button>Add to Cart</Button>
                    </CardBody>
                </Card>
            </CardDeck>
        </div>
    </div>
)

export default TopSellingClothing;
