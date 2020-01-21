import React, { Component } from 'react'
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'rc-slider/assets/index.css';
import './Navbar.css';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt) {
    this.props.handleChange(evt.target.value);
  }
  render() {
    const { level, changeLevel, format } = this.props;

    return (
      <header className="Navbar">
        <div className="logo">
          <a href="#">themecolor picker</a>
        </div>
        Level: {level}
        <div className='slider'> 
          <Slider 
            defaultValue={level} 
            min={100} 
            max={900}
            step={100} 
            onAfterChange={changeLevel}
          />
        </div>
        <div className="select-container">
          <Select onChange={this.handleChange} value={format}>
            <MenuItem value="hex">HEX - #000000</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
      </header>
    )
  }
}
