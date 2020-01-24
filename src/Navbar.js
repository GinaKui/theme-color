import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import 'rc-slider/assets/index.css';
import './Navbar.css';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  handleFormatChange(evt) {
    this.setState({ open: true });
    this.props.handleFormatChange(evt.target.value);
  }
  closeSnackbar() {
    this.setState({ open: false });
  }
  render() {
    const { level, changeLevel, format } = this.props;

    return (
      <header className="Navbar">
        <div className="logo">
          <Link to="/">themecolor picker</Link>
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
          <Select onChange={this.handleFormatChange} value={format}>
            <MenuItem value="hex">HEX - #000000</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
          open={this.state.open}
          autoHideDuration={2500}
          message={<span id="message-id">Format Changed</span>}
          ContentProps={{'aria-describedby': 'message-id'}}
          onClose={this.closeSnackbar}
          action={[
            <IconButton 
              onClick={this.closeSnackbar}
              color="inherit"
              key="close"
              aria-lable="close"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    )
  }
}
