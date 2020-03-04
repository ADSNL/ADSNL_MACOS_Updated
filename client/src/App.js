import React, { Component } from "react";
import "./App.css";
import TopSellingBooks from "./components/TopSelling/TopSellingBooks";
import TopSellingClothing from "./components/TopSelling/TopSellingClothing";
import ProductModal from "./components/ProductModal";


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
          <Navbar clothing={clothingData}/>
          <TopSellingBooks  data={datas} />
          <TopSellingClothing style='' clothing={clothingData} style={{marginTop:'500px'}} />
          <ProductModal />
          <Footer style={{marginTop:'500px'}}/>
       
      </div>

    ) : (
        <h1>Loading</h1>
      );

    return <div>{datasList}</div>;
  }
}

export default App;
