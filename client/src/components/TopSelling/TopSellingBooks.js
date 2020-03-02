import React from "react";
import Cards from "../Cards";
//import './Footer.css';
import {CardDeck, Breadcrumb, BreadcrumbItem, CardGroup} from "reactstrap";

const TopSellingBooks = props => (
  <div>
    <Breadcrumb tag="nav" listTag="div">
      <BreadcrumbItem className="container" tag="a" href="#">
        <b>Top Selling Books</b>
      </BreadcrumbItem>
    </Breadcrumb>

 
        <Cards data={props.data} />
        
    
  </div>
);

export default TopSellingBooks;
