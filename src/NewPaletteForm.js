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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './styles/NewPaletteFormStyles';

const useStyles = makeStyles(styles);

export default function NewPaletteForm(props) {
  const { maxColors, palettes } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [colors, setColors] = React.useState(props.palettes[0].colors);
  const paletteIsFull = colors.length >= maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };


  const clearColors = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    const allColors = palettes.map( p => p.colors ).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors([...colors, randomColor]);
    console.log(allColors);
  };

  const handleSubmit = newPalette => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
    props.savePalette(newPalette);
    props.history.push("/");
  };

  const removeColor = colorName => {
    setColors(colors.filter(({ name }) => name !== colorName));
  };

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav open={open} palettes={palettes} handleSubmit={handleSubmit} handleDrawerOpen={handleDrawerOpen}/>
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
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button variant="contained" color="secondary" className={classes.button} onClick={clearColors}>clear palette</Button>
            <Button variant="contained" color="primary" className={classes.button} disabled={paletteIsFull} onClick={addRandomColor}>random color</Button>
          </div>
          <ColorPickerForm colors={colors} paletteIsFull={paletteIsFull} addNewColor={addNewColor}/>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList colors={colors} removeColor={removeColor} axis="xy" onSortEnd={onSortEnd}/>
      </main>
    </div>
  );
}
