import React from 'react'
import {
    Card, Button, CardImg, CardTitle, CardDeck,
    CardSubtitle, CardBody, Container, Row, Col
} from 'reactstrap';
import ProductModal from './ProductModal';

const SearchResults = (props) => {
    const tiles = [];
    const datas = props.searchData;
    for (let j = 0; j < datas.length; j++) {
        tiles.push(
            <Container>
                <Row>
                    <Col md="3">
                        <Card>
                            <CardImg top width="50" height="200" src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>{datas[j].Title}</CardTitle>
                                <CardSubtitle> $ {datas[j].Price}</CardSubtitle>
                                {
                                    console.log(datas[j])
                                }
                                <ProductModal
                                    buttonLabel="View Details"
                                    productData={datas[j]}
                                    modalImg="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
    return tiles
}

export default SearchResults;
