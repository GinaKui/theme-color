import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorBoxStyles';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.handleCopy = this.handleCopy.bind(this);
  }

  handleCopy() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  render() {
    const { name, background, id, paletteId, showingFullPalette, classes } = this.props;
    const { copied } = this.state;
    // TODO: - ColorBox display css property should be refactored to Palette and SingleColorPalette
    return (
      <CopyToClipboard text={background} onCopy={this.handleCopy}>
        <div className={classes.ColorBox} style={{ background }}>
          <div className={clsx(classes.copyOverlay, {[classes.showOverlay]: copied })} style={{ background }} />
          <div className={clsx(classes.copyMessage, {[classes.showMessage]: copied })}>
            <h1 className={classes.copyText}>copied</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

ColorBox.propTypes = {
  name: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  paletteId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ColorBox);