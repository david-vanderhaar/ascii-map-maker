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
import SaveList from './Components/SaveList';
import Grid from '@material-ui/core/Grid';
import { ReactComponent as Logo } from './logo.svg';

class App extends Component {
  constructor() {
    super();

    const cols = 36;
    const rows = 20;
    const tile_size = 32;
    const tile_gutter = 8;
    const empty_tile = { type: 0, character: '', color: 'white', data: null };
    const tiles = new Array(cols * rows).fill({ ...empty_tile });
    const local_storage_key = 'ascii_map_maker';
    let saves = [];
    try {
      if (localStorage.getItem(local_storage_key)) {
        saves = JSON.parse(localStorage.getItem(local_storage_key));
      }
    } catch(e) {
      console.log('get saves error');
    }

    this.state = {
      local_storage_key,
      show_saves: false,
      saves,
      default_cols: cols,
      default_rows: rows,
      tile_size,
      tile_gutter,
      empty_tile,
      tile_history_max: 10,
      selected_tile: {
        character: '#',
        color: '#fff',
        data: null,
      },
      viewed_tile_id: null,
      viewed_tile: '',
      tile_palette_tiles: [
        {
          id: 1,
          label: 'land',
          color: '#298',
          character: 'L',
          data: {type: 'province', owner: 'Oda'}
        },
        {
          id: 2,
          label: 'water',
          color: '#ace',
          character: '~',
          data: {type: 'natural', owner: 'none'}
        },
        {
          id: 3,
          label: 'mountain',
          color: '#bbb',
          character: 'M',
          data: {type: 'natural', owner: 'none'}
        },
        {
          id: 4,
          label: 'army',
          color: '#f44',
          character: '@',
          data: {type: 'troop', owner: 'Oda'}
        },
      ],
      tool_in_use: 'pencil',
      layers: [
        {
          id: 1,
          name: 'Base',
          cols,
          rows,
          tiles,
          tile_history: [JSON.stringify(tiles)],
          tile_history_index: 0,
          deletable: false,
        },
        {
          id: 2,
          name: 'Base 2',
          cols,
          rows,
          tiles,
          tile_history: [JSON.stringify(tiles)],
          tile_history_index: 0,
          deletable: true,
        },
      ],
      current_layer: 0,
    }
  }

  handleToolSwitch (tool_in_use) {
    this.setState({tool_in_use});
  }

  handleUndo () {
    let tile_history_index = this.state.layers[this.state.current_layer].tile_history_index + 1
    let tiles = JSON.parse(this.state.layers[this.state.current_layer].tile_history[tile_history_index])
    let layers = [...this.state.layers];
    layers[this.state.current_layer].tiles = tiles;
    layers[this.state.current_layer].tile_history_index = tile_history_index;
    this.setState({
      layers
    })
  }
  
  handleRedo () {
    let tile_history_index = this.state.layers[this.state.current_layer].tile_history_index - 1
    let tiles = JSON.parse(this.state.layers[this.state.current_layer].tile_history[tile_history_index])
    let layers = [...this.state.layers];
    layers[this.state.current_layer].tiles = tiles;
    layers[this.state.current_layer].tile_history_index = tile_history_index;
    this.setState({
      layers
    })
  }

  handleSwapSelectedTile (selected_tile_properties) {
    let tool_in_use = this.state.tool_in_use === 'eraser' ? 'pencil' : this.state.tool_in_use
    this.setState({selected_tile: selected_tile_properties, tool_in_use});
  }
 
  handleSwapViewedTile (id, value) {
    this.setState({
      viewed_tile_id: id,
      viewed_tile: value
    });
  }

  handleUpdateTilePaletteTiles (tile_palette_tiles) {
    this.setState({ tile_palette_tiles });
  }

  handleUpdateTiles (tiles) {
    const tile_history_index = this.state.layers[this.state.current_layer].tile_history_index;
    let tile_history = [
      JSON.stringify(tiles),
      ...this.state.layers[this.state.current_layer].tile_history
    ].slice(
      tile_history_index,
      this.state.tile_history_max
    )

    let layers = [...this.state.layers];
    layers[this.state.current_layer].tile_history_index = 0;
    layers[this.state.current_layer].tiles = tiles;
    layers[this.state.current_layer].tile_history = tile_history;
    
    this.setState({
      layers
    })
  }
  
  handleUpdateGridSize (cols, rows, tiles) {
    let layers = [...this.state.layers];
    layers[this.state.current_layer].cols = cols;
    layers[this.state.current_layer].rows = rows;
    layers[this.state.current_layer].tiles = tiles;

    this.setState({
      layers
    })
  }

  handleAddLayer (new_layer) {
    const tiles = new Array(this.state.default_cols * this.state.default_rows).fill({ ...this.state.empty_tile });
    
    let layers = [...this.state.layers];
    let next_id = layers.length > 0 ? layers[layers.length - 1].id + 1 : 1;
    new_layer.id = next_id;
    new_layer.tiles = tiles;
    new_layer.cols = this.state.default_cols;
    new_layer.rows = this.state.default_rows;
    new_layer.tile_history = [JSON.stringify(tiles)];
    new_layer.tile_history_index = 0;
    new_layer.deletable = true;

    layers = layers.concat(new_layer);
    this.setState({layers},
      () => {
        this.handleSwapLayer(next_id);
      }
    );
  }

  handleSwapLayer(id) {
    this.setState({current_layer: id - 1})
  }

  handleRemoveLayer(id) {
    let layers = [...this.state.layers].filter((layer) => layer.id !== id);
    this.setState({layers, current_layer: 0});
  }

  handleEditLayer(id, name) {
    let layers = [...this.state.layers].map((layer) => {
      if (layer.id === id) {
        layer.name = name;
      }
      return layer;
    });
    this.setState({layers});
  }

  handleToggleSaves (value) {
    this.setState({
      show_saves: value,
    })
  }

  handleSaveStateToLocalStorage () {
    let local_saves = JSON.parse(localStorage.getItem(this.state.local_storage_key));
    let next_id  = 1;
    if (local_saves) {
      next_id = local_saves.length > 0 ? local_saves[local_saves.length - 1].id + 1 : 1;
    }
    let new_save = {
      id: next_id,
      timestamp: new Date(),
      data: this.state,
    }

    let saves = local_saves !== null ? [...local_saves, new_save] : [new_save];

    try {
      localStorage.setItem(this.state.local_storage_key, JSON.stringify(saves));
      this.setState({saves})
    } catch(error) {
      alert('Local storage is full');
    }
  }
  
  handleLoadStateFromLocalStorage (id) {
    let save = this.state.saves.filter((save) => save.id === id);
    if (save.length > 0) {
      let new_state = {...save[0].data, saves: [...this.state.saves]}
      this.setState(new_state);
    }
    this.handleToggleSaves(false);
  }

  handleDeleteStateFromLocalStorage (id) {
    let local_saves = JSON.parse(localStorage.getItem(this.state.local_storage_key));
    let remaining_saves = local_saves.filter((save) => save.id !== id);
    localStorage.setItem(this.state.local_storage_key, JSON.stringify(remaining_saves));
    this.setState({ saves: remaining_saves });
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <AppBar className="NavBar" position="static">
            <Toolbar>
              <Logo className='Logo'/>
              <h5 className="nav-title" onClick={() => { window.location = '#/' }}>ASCII Map Maker</h5>
              <GridToolbar 
                onToolSwitch={this.handleToolSwitch.bind(this)}
                onUndo={this.handleUndo.bind(this)}
                onRedo={this.handleRedo.bind(this)}
                tile_history={this.state.layers[this.state.current_layer].tile_history}
                tile_history_index={this.state.layers[this.state.current_layer].tile_history_index}
                selected_tile={this.state.selected_tile}
                tool_in_use={this.state.tool_in_use}
              />
              <div className='nav-buttons-right'>
                <Button 
                  variant='contained'
                  color='secondary'
                  onClick={this.handleSaveStateToLocalStorage.bind(this)}
                >
                  Save
                </Button>
                <Button 
                  variant='contained'
                  color='secondary'
                  disabled={!this.state.saves.length}
                  onClick={() => {this.handleToggleSaves(!this.state.show_saves)}}
                >
                  Load
                </Button>
                <Button color="inherit" onClick={() => {window.location = '#/export'}}>Export</Button>
              </div>
            </Toolbar>
          </AppBar>
          {
            this.state.show_saves && (
              <SaveList
                saves={this.state.saves}
                onLoadSave={this.handleLoadStateFromLocalStorage.bind(this)}
                onDeleteSave={this.handleDeleteStateFromLocalStorage.bind(this)}
              />
            )
          }
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
                    cols={this.state.layers[this.state.current_layer].cols}
                    rows={this.state.layers[this.state.current_layer].rows}
                    tiles={this.state.layers[this.state.current_layer].tiles}
                    tile_size={32}
                    tile_gutter={8}
                    selected_tile={{ ...this.state.selected_tile }}
                    viewed_tile={this.state.viewed_tile}
                    onUpdateTiles={this.handleUpdateTiles.bind(this)}
                    tool_in_use={this.state.tool_in_use}
                    empty_tile={this.state.empty_tile}
                  />
                </ Grid>
                <Grid item xs={12} sm={4}>
                  <ToolPanel 
                    layers={this.state.layers}
                    current_layer={this.state.current_layer}
                    cols={this.state.layers[this.state.current_layer].cols}
                    rows={this.state.layers[this.state.current_layer].rows}
                    tiles={this.state.layers[this.state.current_layer].tiles}
                    empty_tile={this.state.empty_tile}
                    selected_tile={this.state.selected_tile}
                    viewed_tile_id={this.state.viewed_tile_id}
                    viewed_tile={this.state.viewed_tile}
                    tile_palette_tiles={this.state.tile_palette_tiles}
                    handleUpdateTilePaletteTiles={this.handleUpdateTilePaletteTiles.bind(this)} 
                    handleSwapSelectedTile={this.handleSwapSelectedTile.bind(this)} 
                    handleSwapViewedTile={this.handleSwapViewedTile.bind(this)} 
                    handleAddLayer={this.handleAddLayer.bind(this)} 
                    handleSwapLayer={this.handleSwapLayer.bind(this)} 
                    handleRemoveLayer={this.handleRemoveLayer.bind(this)} 
                    handleEditLayer={this.handleEditLayer.bind(this)} 
                    onUpdateGridSize={this.handleUpdateGridSize.bind(this)} 
                  />
                </ Grid>
              </ Grid>
            )} />
            <Route path={'/export'} render={
              (props) => (
                <JsonView 
                  cols={this.state.layers[this.state.current_layer].cols}
                  rows={this.state.layers[this.state.current_layer].rows}
                  tiles={this.state.layers[this.state.current_layer].tiles} 
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
