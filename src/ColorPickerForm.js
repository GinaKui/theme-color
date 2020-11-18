import React from 'react';
import Button from '@material-ui/core/Button';

import { SketchPicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles';
import chroma from 'chroma-js';

function ColorPickerForm(props) {
  const { colors, paletteIsFull, submitColor, classes } = props;
  const [currentColor, setCurrentColor] = React.useState('teal');
  const [newColorName, setNewColorName] = React.useState('');

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase() );
    });
    ValidatorForm.addValidationRule('isColorUnique', () => {
      return colors.every(({ color }) => color !== currentColor );
    });
    return () => {
      ValidatorForm.removeValidationRule('isColorNameUnique');
      ValidatorForm.removeValidationRule('isColorUnique');
    }
  }); 

  const updateCurrentColor = newColor => {
    setCurrentColor(newColor.hex);
  };

  const handleChange = evt => {
    if(evt.target.name === 'newColorName'){
      setNewColorName(evt.target.value);
    }
  };

  const handleSubmit = () => {
    const newColor = {
      color: currentColor,
      name: newColorName
    };
    setNewColorName("");
    submitColor(newColor);
  }

  return (
    <div>
      <SketchPicker 
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className={classes.picker}
        width={240}
      />
      <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
        <TextValidator
          value={newColorName}
          className={classes.colorNameInput}
          placeholder="Color Name"
          name="newColorName"
          variant='filled'
          onChange={handleChange}
          margin="normal"
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={['this field is required', 'color name has to be unique', 'color already used']}
        />
        { /* TODO : dynamicly change text color based on currentColor
          * chroma(currentColor).luminance() doesn't work.
          * need to figure out solution
        */}
        <Button
          type="submit"
          variant="contained"
          disabled={paletteIsFull}
          className={classes.addColor}
          style={{
            backgroundColor: paletteIsFull ? 'grey' : currentColor,
            color: chroma(currentColor).luminance() >= 0.6 ? 'black' : 'white'
          }}
        >
          {paletteIsFull ? 'Full' : 'Add'}
        </Button>
      </ValidatorForm>
    </div>
  )
}

export default withStyles(styles)(ColorPickerForm);