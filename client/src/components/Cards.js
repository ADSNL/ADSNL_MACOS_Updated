import React, { Component } from "react";
//import './Footer.css';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody
} from "reactstrap";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myData: props.data
    };
  }

  render() {
    const datas = this.state.myData;
    const datasList = datas.length ? ( datas.map( item  => {
      return(
      <Card>
      <CardImg
        top
        width="50"
        height="200"
        src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70"
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle>
          <b>{item.Book_Title}</b>
          
          {/* {console.log(item.Book_Title)} */}
          
        </CardTitle>
   
        <CardSubtitle>{item.ISBN_10}</CardSubtitle>
  
        <Button>Add to Cart</Button>
      </CardBody>
    </Card>
        )
    })

    ) : (
      <h1>Loading</h1>
    );
    // {console.log(datasList)}
  
    return <div>
      {datasList}
    </div>
  }
 

}

export default Cards;
