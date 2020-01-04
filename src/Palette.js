import React, { Component } from 'react';
import ColorBox from './ColorBox';
import "./Palette.css";

class Palette extends Component {
  render() {
    const colorBoxes = this.props.colors.map(color => {
      return <ColorBox background={color.color} name={color.name} />;
    });
    return (
      <div className="Palette">
        {/* Navbar should be here */}
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        {/* footer should be here */}
      </div>
    );
  }
}

export default Palette;