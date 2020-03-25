import React from 'react';
import Button from '@material-ui/core/Button';

import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export default function ColorPickerForm(props) {
  const { colors, paletteIsFull, addNewColor } = props;
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
    addNewColor(newColor);
    setNewColorName("");
  }

  return (
    <div>
      <ChromePicker color={currentColor} onChangeComplete={updateCurrentColor}/>
      <ValidatorForm onSubmit={handleSubmit} >
        <TextValidator
          value={newColorName}
          name="newColorName"
          onChange={handleChange}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={['this field is required', 'color name has to be unique', 'color already used']}
        />
      </ValidatorForm>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={paletteIsFull}
        style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
      >
        {paletteIsFull ? 'Palette Full' : 'Add Color'}
      </Button>
    </div>
  )
}
