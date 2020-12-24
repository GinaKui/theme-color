import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';

import 'emoji-mart/css/emoji-mart.css';

function PaletteMetaForm(props) {
  const { palettes, handleSubmit, hideForm } = props;
  const [newPaletteName, setNewPaletteName] = useState("new palette");
  const [stage, setStage] = useState('form');

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
      return palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase() );
    });
    return () => {
      ValidatorForm.removeValidationRule('isPaletteNameUnique');
    }
  });

  const handleChange = evt => {
    setNewPaletteName(evt.target.value);
  };

  const showEmojiPicker = () => {
    setStage('emoji');
  };

  const savePalette = emoji => {
    handleSubmit({
      paletteName: newPaletteName,
      emoji: emoji.native,
    });
    setStage('');
  };

  return (
    <>
      <Dialog open={stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a uniqe name for your new palette.
            </DialogContentText>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              name="newPaletteName"
              onChange={handleChange}
              fullWidth
              margin="normal"
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['palette name is required', 'name has been used']}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit" >
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
      <Dialog open={stage === 'emoji'} onClose={hideForm} aria-labelledby="form-dialog-emoji">
        <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
        <Picker onSelect={savePalette} title="Pick a palette emoji"/>
      </Dialog>
    </>
  );
}

export default PaletteMetaForm;