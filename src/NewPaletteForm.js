import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';

const useStyles = makeStyles(styles);

export default function NewPaletteForm(props) {
  const { maxColors, palettes } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [colors, setColors] = React.useState(seedColors[0].colors);
  const paletteIsFull = colors.length >= maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addColor = newColor => {
    setColors([...colors, newColor]);
  };

  const removeColor = colorName => {
    setColors(colors.filter(({ name }) => name !== colorName));
  };

  const clearColors = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    const allColors = palettes.map( p => p.colors ).flat();
    let isDupplicateColor = true;
    /**
     * @todo new random color generator
     */
    while(isDupplicateColor) {
      const rand = Math.floor(Math.random() * allColors.length);
      let randomColor = allColors[rand];
      isDupplicateColor = colors.some(color => color.name === randomColor.name);
      if(!isDupplicateColor) {
        addColor(randomColor);
      }
    }
  };

  const handleSubmit = newPalette => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
    props.savePalette(newPalette);
    props.history.push("/");
  };

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open} 
        palettes={palettes} 
        handleSubmit={handleSubmit} 
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Pick Color
          </Typography>
          <div className={classes.buttons}>
            <Button variant="contained" color="secondary" className={classes.button} onClick={clearColors}>clear palette</Button>
            <Button variant="contained" color="primary" className={classes.button} disabled={paletteIsFull} onClick={addRandomColor}>random color</Button>
          </div>
          <ColorPickerForm colors={colors} paletteIsFull={paletteIsFull} submitColor={addColor}/>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList 
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={20} 
        />
      </main>
    </div>
  );
}
