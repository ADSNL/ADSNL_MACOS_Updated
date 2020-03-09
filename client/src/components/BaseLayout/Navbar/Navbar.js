import React, { useState } from 'react';

import {
    Collapse,
    Navbar,
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

const Example = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
    <Router>
    <div>
        <Navbar color="light"
            light expand="md">
            <NavbarBrand href="/"><b>ADSNL</b></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav color="light" className="mr-auto" navbar>
                    <NavItem>
                        <Link to="books"><b>Books</b></Link >
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
        </Navbar>
    </div>
    <Switch>
        <Route path="/books">
        
          <TileView/>
        
        </Route>

    </Switch>
    </Router>
    );
}

export default Example;