import React, { Component } from "react";
import "./App.css";
import TopSellingBooks from "./components/TopSelling/TopSellingBooks";
import TopSellingClothing from "./components/TopSelling/TopSellingClothing";
import ProductModal from "./components/ProductModal";
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

import {CardDeck} from 'reactstrap'; //0305 test remove later

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      clothing: []
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

  componentDidMount() {
    this.getBooks();
    this.getClothing();
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
        <Link to="/"><b><Navbar/></b></Link >
        <Link to="/booksT"><b>booksT</b></Link >
      <Switch>
       <Route path="/booksT">
       

         <TileView/>
       
       </Route>
       {/* <Route exact path="/" component={Landing} /> */}
       <Route path="/">
          
          {/* <TopSellingBooks  data={datas} /> */}
         <Landing data={datas}/>
       
       </Route>

       {/* <TopSellingBooks  data={datas} /> */}
       {/* <TopSellingClothing style='' clothing={clothingData} style={{marginTop:'500px'}} /> */}
       
       
       

      </Switch>
    </BrowserRouter>
    <ProductModal buttonLabel="Cart" modalText="Test 1"/>
    <Footer style={{marginTop:'500px'}}/>
       
    </div>

    ) : (
        <h1>Loading</h1>
      );

    return <div>{datasList}</div>;
  }
}

export default App;
