import React, { Component } from "react";
import TilePalette from './TilePalette';

class ToolPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="ToolPanel">
        <TilePalette handleSwapSelectedTile={this.props.handleSwapSelectedTile}/>
      </div>
    );
  }
}

export default ToolPanel;