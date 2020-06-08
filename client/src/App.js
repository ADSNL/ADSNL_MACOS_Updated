import React, { Component } from "react";
import "./App.css";
import Footer from './components/BaseLayout/Footer/Footer';
import Landing from './components/LandingPage/Landing';
import UserStore from './components/stores/UserStore';
import LoginForm from './components/Login/LoginForm';
import SubmitButton from './components/Login/SubmitButton';
import { observer } from 'mobx-react';

import {
  BrowserRouter,
  Route,
  Link
} from "react-router-dom";

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

  async componentDidMount() {
    this.getBooks();
    this.getClothing();
    try {
      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }

      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }

    catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {
      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }
    }

    catch (e) {
      console.log(e);
    }
  }

  render() {

    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">
            <h1>Loading please wait...</h1>
          </div>
        </div>
      );
    }

    else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="app">
            <div className="container">
              Welcome {UserStore.username}
              <SubmitButton
                text={'Log Out'}
                disabled={false}
                onClick={() => this.doLogout()}
              />
            </div>
          </div>
        );
      }
    }

    const datas = this.state.books;
    const clothingData = this.state.clothing;
    return (
      <div className="app">
        <div className="container">
          <LoginForm />
        </div>
      </div>
    )
    // const datasList = datas.length ? (
    //   <div>
    //     <BrowserRouter>
    //       <div>
    //         <NavbarB color="light"
    //           light expand="md">
    //           <NavbarBrand href="/"><Link to="/"><b>ADSNL</b></Link></NavbarBrand>
    //           <Nav color="light" className="mr-auto" navbar>
    //             <NavItem>
    //               <NavLink><Link to="/books"><b>Books</b></Link></NavLink>
    //             </NavItem>
    //             <NavItem>
    //               <NavLink><Link to="/clothing"><b>Clothing</b></Link></NavLink>
    //             </NavItem>
    //             <NavItem>
    //               <NavLink><Link to="/movies"><b>Movies</b></Link></NavLink>
    //             </NavItem>
    //             <NavItem>
    //               <NavLink><Link to="/kitchen"><b>Kitchen</b></Link></NavLink>
    //             </NavItem>
    //             <NavItem>
    //               <NavLink><Link to="/makeup"><b>Make up</b></Link></NavLink>
    //             </NavItem>
    //             <NavItem>
    //               <NavLink><Link to="/pets"><b>Pets</b></Link></NavLink>
    //             </NavItem>
    //             <NavItem>
    //               <NavLink><Link to="/dashboard"><b>Dashboard</b></Link></NavLink>
    //             </NavItem>
    //           </Nav>
    //           <NavbarText><b>Login</b></NavbarText>
    //         </NavbarB>
    //       </div>
    //       <Route exact path="/">
    //         <Landing data={datas} />
    //       </Route>
    //       <Route component={Routes} />
    //     </BrowserRouter>
    //     <Footer style={{ marginTop: '500px' }} />
    //   </div>
    // ) : (
    //     <h1>Loading</h1>
    //   );
    // return (
    //   <div>
    //     {datasList}
    //   </div>
    // )
  }
}

export default observer(App);