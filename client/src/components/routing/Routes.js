import React from 'react';
import { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import TileView from '../TileView/TileView';
import Navbar from '../BaseLayout/Navbar/Navbar';

const Routes = () => {
    return (
        // <Route exact path='/TileView' component={TileView} />
        <Switch>
            <Route exact path="/booksT">
                <TileView />
            </Route>
            <Route exact path="/books" component={Navbar}>
                <TileView catName={"Books"} />
            </Route>
            <Route exact path="/clothing" component={Navbar}>
                <TileView catName={"Clothing"}/>
            </Route>
            <Route exact path="/movies" component={Navbar}>
                <TileView catName={"Movies"}/>
            </Route>
            <Route exact path="/kitchen" component={Navbar}>
                <TileView catName={"Kitchen"}/>
            </Route>
            <Route exact path="/makeup" component={Navbar}>
                <TileView catName={"Make up"}/>
            </Route>
            <Route exact path="/pets" component={Navbar}>
                <TileView catName={"Pets"}/>
            </Route>
        </Switch>
    )
}

export default Routes;