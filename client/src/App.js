import React, { Component } from "react";
import "./App.css";
import TopSellingBooks from "./components/TopSelling/TopSellingBooks";
import TopSellingClothing from "./components/TopSelling/TopSellingClothing";
import Footer from './components/BaseLayout/Footer/Footer'
import Navbar from './components/BaseLayout/Navbar/Navbar'
import TileView from './components/TileView/TileView'
import Landing from './components/LandingPage/Landing'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { CardDeck } from 'reactstrap'; //0305 test remove later

import Routes from './components/routing/Routes'

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
import './components/BaseLayout/Navbar/Navbar.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      clothing: [],
      searchTerm: ''
    };
  }

  getBooks = async () => {
    fetch("http://localhost:5000/api/books")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          books: data
        });
      })
      .catch(err => err);
  };

  getClothing = async () => {
    fetch("http://localhost:5000/api/clothing")
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({
          clothing: data
        });
      })
      .catch(err => err);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("REACT : " + this.searchTerm);
    fetch(`http://localhost:5000/api/search/${this.searchTerm}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({
          clothing: data
        });
      })
      .catch(err => err);
  };

  componentDidMount() {
    this.getBooks();
    this.getClothing();
  }

  handleChange = (e) => {
    this.searchTerm = e.target.value;
  }

  render() {
    const datas = this.state.books;
    const clothingData = this.state.clothing;
    const datasList = datas.length ? (

      <div>
        {/* <BrowserRouter> */}
        {/* <Route exact path='/TileView' component={TileView} /> */}
        {/* <Route exact path='/' component={TopSellingBooks} /> */}


        {/* </BrowserRouter> */}
        {/* <Navbar/> */}
        {/* <TopSellingBooks  data={datas} /> */}

        {/* <Navbar data={datas}/> */}

        {/* <TopSellingClothing style='' clothing={clothingData} style={{marginTop:'500px'}} /> */}
        {/* <CardDeck>
          <TileView productName={datas.Book_Title} productPrice={datas.Unit_Price}/>
          </CardDeck> */}

        <BrowserRouter>
          {/* <Navbar/>
        <Link to="/"><b>ADSNL</b></Link >
        <Link to="/booksT"><b>booksT</b></Link > */}

          <div>
            <NavbarB color="light"
              light expand="md">
              <NavbarBrand href="/"><Link to="/"><b>ADSNL</b></Link></NavbarBrand>
              {/* <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar> */}
              <Nav color="light" className="mr-auto" navbar>
                <NavItem>
                  <NavLink><Link to="/books"><b>Books</b></Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to="/clothing"><b>Clothing</b></Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to="/movies"><b>Movies</b></Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to="/kitchen"><b>Kitchen</b></Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to="/makeup"><b>Make up</b></Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to="/pets"><b>Pets</b></Link></NavLink>
                </NavItem>
              </Nav>
              {/* <NavbarText><b>Login</b></NavbarText> */}
              <form action="" onSubmit={this.handleSubmit}>
                <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
              </form>
              {/* </Collapse> */}
            </NavbarB>
          </div>

          {/* <Switch> */}
          <Route exact path="/">
            {/* <TopSellingBooks  data={datas} /> */}
            <Landing data={datas} />
          </Route>
          <Route component={Routes} />
          {/* <Route exact path="/booksT">
         <TileView/>
       </Route>

       <Route exact path="/books" component={Navbar}>
         <TileView/>
       </Route> */}
          {/* <Route exact path="/" component={Landing} /> */}

          {/* <TopSellingBooks  data={datas} /> */}
          {/* <TopSellingClothing style='' clothing={clothingData} style={{marginTop:'500px'}} /> */}

          {/* </Switch> */}
        </BrowserRouter>
        <Footer style={{ marginTop: '500px' }} />

      </div>

    ) : (
        <h1>Loading</h1>
      );

    return <div>{datasList}</div>;
  }
}

export default App;
