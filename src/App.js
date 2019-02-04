import React, { Component } from 'react';
import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import './App.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import JsonView from './Components/JsonView';
import TileMap from './Components/TileMap';
import ToolPanel from './Components/ToolPanel';
import GridToolbar from './Components/Toolbar';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  constructor() {
    super();

    const cols = 30;
    const rows = 30;
    const tile_size = 32;
    const tile_gutter = 8;
    const empty_tile = { type: 0, character: '', color: 'white' };

    this.state = {
      cols,
      rows,
      tile_size,
      tile_gutter,
      empty_tile,
      tiles: new Array(cols * rows).fill({...empty_tile}),
      selected_tile: {
        character: '#',
        color: '#fff',
        data: null,
      },
      tool_in_use: 'pencil',
    }
  }

  handleToolSwitch (tool_in_use) {
    this.setState({tool_in_use});
  }

  handleSwapSelectedTile (selected_tile_properties) {
    let tool_in_use = this.state.tool_in_use === 'eraser' ? 'pencil' : this.state.tool_in_use
    this.setState({selected_tile: selected_tile_properties, tool_in_use});
  }

  handleUpdateTiles (tiles) {
    this.setState({tiles})
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <AppBar className="NavBar" position="static">
            <Toolbar>
              <h5 className="nav-title" onClick={() => { window.location = '#/' }}>ASCII Map Maker</h5>
              <GridToolbar 
                onToolSwitch={this.handleToolSwitch.bind(this)}
                selected_tile={this.state.selected_tile}
                tool_in_use={this.state.tool_in_use}
              />
              <div className='nav-buttons-right'>
                <Button color="inherit" onClick={() => {window.location = '#/export'}}>Export</Button>
              </div>
            </Toolbar>
          </AppBar>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="fade"
          >
            <Route exact path={'/'} render={(props) => (
              <Grid container >
                <Grid item xs={12} sm={8}>
                  <TileMap
                    cols={this.state.cols}
                    rows={this.state.rows}
                    tiles={this.state.tiles}
                    tile_size={32}
                    tile_gutter={8}
                    selected_tile={{ ...this.state.selected_tile }}
                    onUpdateTiles={this.handleUpdateTiles.bind(this)}
                    tool_in_use={this.state.tool_in_use}
                    empty_tile={this.state.empty_tile}
                  />
                </ Grid>
                <Grid item xs={12} sm={4}>
                  <ToolPanel handleSwapSelectedTile={this.handleSwapSelectedTile.bind(this)} />
                </ Grid>
              </ Grid>
            )} />
            <Route path={'/export'} render={
              (props) => (
                <JsonView 
                  cols={this.state.cols}
                  rows={this.state.rows}
                  tiles={this.state.tiles} 
                />
              )} 
            />
          </AnimatedSwitch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
