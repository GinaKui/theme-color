import { FullscreenExit } from '@material-ui/icons';
import sizes from './sizes';
export default {
  Navbar: {
    height: "6vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  logo: {
    marginRight: "15px",
    height: "100%",
    padding: "0 13px",
    backgroundColor: "#eceff1",
    fontFamily: "Roboto",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
      color: "black"
    },
    [sizes.down("xs")]: {
      display: "none"
    }
  },
  slider: {
    width: "340px",
    margin: "0 10px",
    display: "inline-block",
    "& .rc-slider-track": {
      backgroundColor: "transparent"
    },
    "& .rc-slider-rail": {
      height: "8px"
    }, 
    "& .rc-slider-handle, .rc-slider-handle:focus, .rc-slider-handle:active, .rc-slider-handle:hover": {
      backgroundColor: "green",
      outline: "none",
      border: "2px solid green",
      boxShadow: "none",
      width: "13px",
      height: "13px",
      marginLeft: "-7px",
      marginTop: "-3px" 
    },
    [sizes.down("sm")]: {
      width: "150px"
    }
  },
  selectContainer: {
    marginLeft: "auto",
    marginRight: "1rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"

  }
};