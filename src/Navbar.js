import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles/NavbarStyles';
import 'rc-slider/assets/index.css';


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  handleFormatChange(evt) {
    if(this.props.format !== evt.target.value) {
      this.setState({ open: true });
      this.props.handleFormatChange(evt.target.value);
    }
  }
  closeSnackbar() {
    this.setState({ open: false });
  }
  render() {
    const { level, changeLevel, format, showAllColors, classes } = this.props;

    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/">themecolor picker</Link>
        </div>
        {showAllColors && (
          <div>
            Level: {level}
            <div className={classes.slider}> 
              <Slider
                aria-labelledby="slider bar to change color brightness"
                defaultValue={level} 
                min={100} 
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <InputLabel id="color-format-select">Color Format</InputLabel>
          <Select onChange={this.handleFormatChange} value={format} labelId="color-format-select">
            <MenuItem value="hex">HEX - #000000</MenuItem>
            <MenuItem value="rgb">RGB - rgb(0,0,0)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(0,0,0,1)</MenuItem>
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
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    );
  }
}

Navbar.propTypes = {
  level: PropTypes.number.isRequired,
  changeLevel: PropTypes.func.isRequired,
  handleFormatChange: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
  showAllColors: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);