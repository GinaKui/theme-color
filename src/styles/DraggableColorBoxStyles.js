import chroma from 'chroma-js';
import sizes from './sizes';
export default {
  root: {
    width: "20%",
    height: "25%",
    margin: "-2px 0",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.6)"
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%"
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "5%"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    textAlign: "start",
    color: props => chroma(props.color).luminance() <= 0.08 ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)',
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between"
  },
  deleteIcon: {
    color: "rgba(0,0,0, .5)",
    transition: "all .3s ease-in-out"
  }
};