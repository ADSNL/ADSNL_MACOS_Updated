import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Media, Card, CardImg, CardTitle, CardDeck,
    CardSubtitle, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ProductModal from "../ProductModal";
// import { ModalTitle } from 'react-bootstrap';

const TileRow = (props) => {
  const {
   productName=[],
   productPrice=[],
   productImg=[]
  } = props;

  let tiles = []
  
//   for(let i =0; i <5; i+5){
//       let elements =[]
//       for (let j=i; j<i+5; j++){
//         elements.push(
//         <Card>
//             <CardImg top width="50" height="200" src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt="Card image cap" /> 
//               <CardBody>
//                 <CardTitle>{productName[j]}</CardTitle>
//                 <CardSubtitle> $ {productPrice[j]}</CardSubtitle>
//                 {/* <ProductModal buttonLabel="Add to Cart" modalTitle={props.data[0].Book_Title} modalText={props.data[0].ISBN_10} modalImg="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70"/> */}
//               </CardBody>
//         </Card>
//         )
//       }
// for (let i=0; i<2; i++){
//     tiles.push(<CardDeck>)
    for (let j=0; j<5; j++){
      tiles.push(
      <Card>
          <CardImg top width="50" height="200" src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt="Card image cap" /> 
            <CardBody>
              <CardTitle>{productName[j]}</CardTitle>
              <CardSubtitle> $ {productPrice[j]}</CardSubtitle>
              <ProductModal buttonLabel="Add to Cart"/>
              {/* <ProductModal buttonLabel="Add to Cart" modalTitle={props.data[0].Book_Title} modalText={props.data[0].ISBN_10} modalImg="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70"/> */}
            </CardBody>
      </Card>
      )
    
      {/* tiles.push(</CardDeck>) */}
    //   tiles.push({elements})

  }

  return tiles
}

export default TileRow;