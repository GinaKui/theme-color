import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MiniPaletteStyles';


function MiniPalette(props) {
  const { classes, paletteName, emoji, id, colors, handleClick } = props;
  const miniColorBoxes = colors.map(color => (
    <div 
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}>
    </div>
  ));

  const deletePalette = evt => {
    evt.stopPropagation();
    props.handleDelete(id);
  }

  return (
    <div className={classes.root} onClick={handleClick}>
      <DeleteIcon className={classes.deleteIcon} onClick={deletePalette} />
      <div className={classes.colors}>
        {miniColorBoxes}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);