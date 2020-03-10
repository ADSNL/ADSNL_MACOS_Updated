import React from 'react';
import { Component } from "react";
import { Switch,Route} from 'react-router-dom';
import TileView from '../TileView/TileView';
import Navbar from '../BaseLayout/Navbar/Navbar';

const Routes = () => {
    return (
        // <Route exact path='/TileView' component={TileView} />
        <Switch>
            <Route exact path="/booksT">
            <TileView/>
         </Route>

        <Route exact path="/books" component={Navbar}>
            <TileView/>
        </Route>
      </Switch>

    )
}

export default Routes;