const styles = {
  root: {
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '.5rem',
    position: 'relative',
    overflow: 'hidden',
    cusor: 'pointer',
    '&:hover svg': {
      opacity: 1
    }
  },
  colors: {
    backgroundColor: 'grey',
    height: '150px',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  title: {
    display: 'flex',
    justifiyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '.5rem',
    fontSize: '1rem',
    position: 'relative'
  },
  emoji: {
    marginLeft: '.5rem',
    fontSize: '1.5rem'
  },
  miniColor: {
    height: '25%',
    width: '20%',
    display: 'inline-block',
    margin: '0 auto',
    position: 'relative',
    marginBottom: '-3.5px'
  },
  deleteIcon: {
    color: "white",
    backgroundColor: "#eb3d30",
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "0px",
    top: "0px",
    padding: "10px",
    zIndex: 10,
    opacity: 0,
    transition: "all .3s ease-in-out"
  }
};

export default styles;