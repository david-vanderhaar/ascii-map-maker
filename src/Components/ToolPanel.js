import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TilePalette from './TilePalette';
import Layers from './Layers';
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
            <Tab label="Layers" />
            <Tab label="Settings" />
          </Tabs>
        </AppBar>
        <span className={this.state.value === 0 ? '' : 'hidden'}>
          <TilePalette 
            handleSwapViewedTile={this.props.handleSwapViewedTile}
            handleSwapSelectedTile={this.props.handleSwapSelectedTile}
            handleUpdateTilePaletteTiles={this.props.handleUpdateTilePaletteTiles}
            selected_tile={this.props.selected_tile}
            viewed_tile_id={this.props.viewed_tile_id}
            viewed_tile={this.props.viewed_tile}
            tiles={this.props.tile_palette_tiles}
          />
        </span>
        <span className={this.state.value === 1 ? '' : 'hidden'}>
          <Layers 
            layers={this.props.layers}
            current_layer={this.props.current_layer}
            handleAddLayer={this.props.handleAddLayer}
            handleSwapLayer={this.props.handleSwapLayer}
            handleRemoveLayer={this.props.handleRemoveLayer}
            handleEditLayer={this.props.handleEditLayer}
          />
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