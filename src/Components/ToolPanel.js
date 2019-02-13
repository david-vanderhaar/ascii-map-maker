import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TilePalette from './TilePalette';
import RegionViewer from './RegionViewer';
import Settings from "./Settings";

class ToolPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className="ToolPanel">
        <AppBar className='tool-tabs' position="static">
          <Tabs variant="fullWidth" value={this.state.value} onChange={this.handleChange}>
            <Tab label="Palette" />
            <Tab label="Regions" />
            <Tab label="Settings" />
          </Tabs>
        </AppBar>
        {/* {this.state.value === 0 && <TilePalette handleSwapSelectedTile={this.props.handleSwapSelectedTile}/>}
        {this.state.value === 1 && <RegionViewer />} */}
        <span className={this.state.value === 0 ? '' : 'hidden'}>
          <TilePalette handleSwapSelectedTile={this.props.handleSwapSelectedTile}/>
        </span>
        <span className={this.state.value === 1 ? '' : 'hidden'}>
          <RegionViewer />
        </span>
        <span className={this.state.value === 2 ? '' : 'hidden'}>
          <Settings
            cols={this.props.cols} 
            rows={this.props.rows} 
            tiles={this.props.tiles} 
            empty_tile={this.props.empty_tile} 
            onUpdateGridSize={this.props.onUpdateGridSize}
          />
        </span>
      </div>
    );
  }
}

export default ToolPanel;