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

const Example = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (<div>
        <Navbar color="light"
            light expand="md">
            <NavbarBrand href="/"><b>ADSNL</b></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav color="light" className="mr-auto" navbar>
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
    );
}

export default Example;