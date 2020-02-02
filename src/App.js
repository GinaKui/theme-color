import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './PaletteList';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from "./colorHelpers";
import './App.css';

export default class App extends Component {
  findPalette(id) {
    return seedColors.find(function(palette) {
      return palette.id === id;
    });
  }
  render() {
    return (
      <Switch>
        <Route 
          exact 
          path="/" 
          render={() => <PaletteList palettes={seedColors} />} 
        />
        <Route 
          exact 
          path="/palette/:id" 
          render={routeProps => ( 
            <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />        
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(props) => <h1>Single Color Page for {props.match.params.colorId}</h1>}
        />
      </Switch> 
    );
  }
}


