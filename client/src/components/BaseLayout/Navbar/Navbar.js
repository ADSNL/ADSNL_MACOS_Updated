import React, { useState } from 'react';

import {
    Collapse,
    Navbar as NavbarB, //Navbar from bootstrap
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import './Navbar.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import {CardDeck} from 'reactstrap'; //0305 test remove later

import TileView from '../../TileView/TileView';

import TopSellingBooks from "../../TopSelling/TopSellingBooks";


const Navbar = (props) => {

    
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
    <Router>
    <div>
        <NavbarB color="light"
            light expand="md">
            <NavbarBrand href="/"><Link to="/"><b>ADSNL</b></Link ></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav color="light" className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/components/"><Link to="/books"><b>Books</b></Link ></NavLink >
                    </NavItem>
                    <NavItem>
                       
                            
                        <NavLink href="/components/"><b>Clothing</b></NavLink >
                        
                    </NavItem>
                    <NavItem>
                        <NavLink href="/components/"><b>Movies</b></NavLink >
                    </NavItem><NavItem>
                        <NavLink href="/components/"><b>Books</b></NavLink >
                    </NavItem><NavItem>
                        <NavLink href="/components/"><b>Kitchen</b></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/components/"> <b> Make up </b></NavLink >
                    </NavItem>
                    <NavItem>
                        <NavLink href="/components/"><b>Pets</b></NavLink >
                    </NavItem></Nav> <NavbarText><b>Login</b></NavbarText></Collapse>
        </NavbarB>
    </div>
    {/* <Switch>
        <Route path="/books">
        

          <TileView/>
        
        </Route> */}
        {/* <Route path="/">
        
        <TopSellingBooks  data={props} />
        {console.log(props)}
        
      </Route> */}
      {/* <Route exact path="/home"> */}
       

       {/* <h1> hello</h1> */}
       {/* <TopSellingClothing  /> */}
       
       {/* </Route> */}

    {/* </Switch> */}
    </Router>
    );
}

export default Navbar;