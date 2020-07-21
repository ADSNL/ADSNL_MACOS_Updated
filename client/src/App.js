import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App




// import React, { Component } from "react";
// import "./App.css";
// import Footer from './components/BaseLayout/Footer/Footer';
// import Landing from './components/LandingPage/Landing';
// import {
//   BrowserRouter,
//   Route,
//   Link
// } from "react-router-dom";

// import Routes from './components/routing/Routes'

// import {
//   Collapse,
//   Navbar as NavbarB, //Navbar from bootstrap
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   NavbarText
// } from 'reactstrap';
// import './components/BaseLayout/Navbar/Navbar.css';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       books: [],
//       clothing: []
//     };
//   }

//   getBooks = async () => {
//     fetch("http://localhost:5000/api/books")
//       .then(res => {
//         return res.json();
//       })
//       .then(data => {
//         this.setState({
//           books: data
//         });
//       })
//       .catch(err => err);
//   };

//   getClothing = async () => {
//     fetch("http://localhost:5000/api/clothing")
//       .then(res => {
//         return res.json()
//       })
//       .then(data => {
//         this.setState({
//           clothing: data
//         });
//       })
//       .catch(err => err);
//   };

//   componentDidMount() {
//     this.getBooks();
//     this.getClothing();
//   }

//   render() {
//     const datas = this.state.books;
//     const clothingData = this.state.clothing;
//     const datasList = datas.length ? (

//       <div>
//         <BrowserRouter>
//           <div>
//             <NavbarB color="light"
//               light expand="md">
//               <NavbarBrand href="/home"><Link to="/home"><b>ADSNL</b></Link></NavbarBrand>
//               <Nav color="light" className="mr-auto" navbar>
//                 <NavItem>
//                   <NavLink><Link to="/books"><b>Books</b></Link></NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink><Link to="/clothing"><b>Clothing</b></Link></NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink><Link to="/movies"><b>Movies</b></Link></NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink><Link to="/kitchen"><b>Kitchen</b></Link></NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink><Link to="/makeup"><b>Make up</b></Link></NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink><Link to="/pets"><b>Pets</b></Link></NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink><Link to="/dashboard"><b>Dashboard</b></Link></NavLink>
//                 </NavItem>
//               </Nav>
//               <NavbarText><b>Login</b></NavbarText>
//             </NavbarB>
//           </div>
//           <Route exact path="/">
//             <Landing data={datas} />
//           </Route>
//           <Route component={Routes} />
//         </BrowserRouter>
//         <Footer style={{ marginTop: '500px' }} />

//       </div>

//     ) : (
//         <h1>Loading</h1>
//       );

//     return <div>{datasList}</div>;
//   }
// }

// export default App;