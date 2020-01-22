import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from "./colorHelpers";
import './App.css';

export default class App extends {
  render() {
    return (
      <Switch>
        <Route exact path="/" />
        <Route exact path="/palette/:id" render={() => {
          <div className="App">
            <Palette palette={generatePalette(seedColors[4])}/>
          </div>
        }}/>
      </Switch>
      
    );
  }
}


