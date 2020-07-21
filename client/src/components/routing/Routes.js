import React from 'react';
import { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import TileView from '../TileView/TileView';
import Dashboard from '../Dashboard/Dashboard';
import Navbar from '../BaseLayout/Navbar/Navbar';

const Routes = () => {
    return (
        // <Route exact path='/TileView' component={TileView} />
        <Switch>
            <Route path="/books" component={Navbar}>
                <TileView catName={"Books"} />
            </Route>
            <Route path="/clothing" component={Navbar}>
                <TileView catName={"Clothing"} />
            </Route>
            <Route path="/movies" component={Navbar}>
                <TileView catName={"Movies"} />
            </Route>
            <Route path="/kitchen" component={Navbar}>
                <TileView catName={"Kitchen"} />
            </Route>
            <Route path="/makeup" component={Navbar}>
                <TileView catName={"Make up"} />
            </Route>
            <Route path="/pets" component={Navbar}>
                <TileView catName={"Pets"} />
            </Route>
            <Route path="/dashboard" component={Navbar}>
                <Dashboard />
            </Route>
        </Switch>
    )
}

export default Routes;