import React, { Component } from 'react';
import './App.scss';
import TileMap from './Components/TileMap';
import ToolPanel from './Components/ToolPanel';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selected_tile: {
        character: '#',
        color: '#fff',
        data: null,
      },
    }
  }

  handleSwapSelectedTile (selected_tile_properties) {
    this.setState({selected_tile: selected_tile_properties}, console.log(this.state.selected_tile)
    );
  }

  render() {
    return (
      <div className="App">
        <h1 className="center">Total War Demake</h1>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={8}>
            <TileMap
              cols={40}
              rows={40}
              tile_size={32}
              tile_gutter={8}
              selected_tile={{...this.state.selected_tile}}
            />
          </ Grid>
          <Grid item xs={12} sm={4}>
            <ToolPanel handleSwapSelectedTile={this.handleSwapSelectedTile.bind(this)} />
          </ Grid>
        </ Grid>
      </div>
    );
  }
}

export default App;
