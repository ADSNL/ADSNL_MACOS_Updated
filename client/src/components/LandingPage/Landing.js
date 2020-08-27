import React, { Component } from "react";
import "../../App.css";
import TopSellingBooks from "../TopSelling/TopSellingBooks";
import TopSellingClothing from "../TopSelling/TopSellingClothing";
import TopSellingMovies from "../TopSelling/TopSellingMovies"
// import ProductModal from "./components/ProductModal";
// import Footer from './components/BaseLayout/Footer/Footer'
// import Navbar from './components/BaseLayout/Navbar/Navbar'
// import TileView from './components/TileView/TileView'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {CardDeck} from 'reactstrap'; //0305 test remove later


      const Landing =  props =>(
        
        <div>
            <TopSellingBooks data={props.data}/>
            {/* {console.log(props.data)} 
            {console.log(props.clothing)} */}

            <TopSellingClothing data={props.clothing}/>
            <TopSellingMovies data={props.movies} />
         
        </div>

    
    );
//     // ) : (
//     //     <h1>Loading</h1>
//     //   );

    
// //   }


// class Landing extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         books: [],
//         clothing: []
//       };
//     }
  
//     getBooks = async () => {
//       fetch("http://localhost:5000/api/books")
//         .then(res => {
//           return res.json();
//         })
//         .then(data => {
//           this.setState({
//             books: data
//           });
//         })
//         .catch(err => err);
//     };
  
//     getClothing = async () => {
//       fetch("http://localhost:5000/api/clothing")
//         .then(res => {
//           return res.json()
//         })
//         .then(data => {
//           this.setState({
//             clothing: data
//           });
//         })
//         .catch(err => err);
//     };
  
//     componentDidMount() {
//       this.getBooks();
//       this.getClothing();
//     }
  
//     render() {
//       const datas = this.state.books;
//       const clothingData = this.state.clothing;
//       const datasList = datas.length ? (
        
//           <div>
//             {/* <BrowserRouter> */}
//             {/* <Route exact path='/TileView' component={TileView} /> */}
//             {/* <Route exact path='/' component={TopSellingBooks} /> */}
  
  
//             {/* </BrowserRouter> */}
//             <Navbar/>
//             {/* <TopSellingBooks  data={datas} /> */}
  
//             {/* <Navbar data={datas}/> */}
            
//             {/* <TopSellingClothing style='' clothing={clothingData} style={{marginTop:'500px'}} /> */}
//             {/* <CardDeck>
//             <TileView productName={datas.Book_Title} productPrice={datas.Unit_Price}/>
//             </CardDeck> */}
//             <Link to="/"><b>ADSNL</b></Link >
//         <BrowserRouter>
//         <Switch>
//          <Route path="/books">
         
  
//            <TileView/>
         
//          </Route>
//          {/* <Route exact path="/" component={Landing}/> */}
//          <Route path="/">
            
//             <TopSellingBooks  data={datas} />
//            {/* <Landiing data={datas}/> */}
         
//          </Route>
  
//          {/* <TopSellingBooks  data={datas} /> */}
//          {/* <TopSellingClothing style='' clothing={clothingData} style={{marginTop:'500px'}} /> */}
         
         
         
  
//         </Switch>
//       </BrowserRouter>
//       <ProductModal buttonLabel="Cart" modalText="Test 1"/>
//       <Footer style={{marginTop:'500px'}}/>
         
//       </div>
  
//       ) : (
//           <h1>Loading</h1>
//         );
  
//       return <div>{datasList}</div>;
//     }
//   }
  
  
  

export default Landing;
