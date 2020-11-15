import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import MiniPalette from './MiniPalette';

import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
  constructor() {
    super();
    this.state = {
      openDeleteDialog: false,
      deletingId: ""
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.goToPalette = this.goToPalette.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  openDialog(id) {
    this.setState({ openDeleteDialog: true , deletingId: id });
  }
  closeDialog() {
    this.setState({ openDeleteDialog: false, deletingId: "" });
  }
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  handleDelete() {
    this.props.deletePalette(this.state.deletePalette);
    this.closeDialog();
  }
  render() {
    const { palettes, classes, deletePalette } = this.props;
    const { openDeleteDialog, deletingId } = this.state;
    return ( 
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>Theme Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => ( 
              <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                <MiniPalette
                  {...palette}
                  key={palette.id}
                  goToPalette={this.goToPalette}
                  handleDelete={this.openDialog}
                  //handleDelete={deletePalette}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog open={openDeleteDialog} aira-labelledby="delete-dialog-title" onClose={this.handleDelete}>
          <DialogTitle id="delete-dialog-title">Delete this palette?</DialogTitle>
          <List>
            <ListItem button onClick={() => deletePalette(deletingId)}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete">Delete</ListItemText>
            </ListItem>
            <ListItem button onClose={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel">Cancel</ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);
