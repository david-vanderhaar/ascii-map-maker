import React, { Component } from "react";
import TileForm from './TileForm';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TilePreview from './TilePreview';

const TilePlate = ({ id, label, color, character, data, can_view, handleSwapSelectedTile, handleSwapViewedTile, handleCloseForm, handleRemoveTile, handleToggleEdit}) => {
  const view_action = can_view 
  ? (
      <Button
        color="secondary"
        aria-label="view tile"
        onClick={() => {
          handleSwapViewedTile(id, JSON.stringify({ character, color, data, }))
        }}
      >
        <i className="material-icons">
          search
        </i>
      </Button>
  )
  : (
    <Button
      color="secondary"
      aria-label="stop viewing tile"
      onClick={() => {
        handleSwapViewedTile(null, '')
      }}
    >
      <i className="material-icons">
        close
      </i>
    </Button>
  )
  return (
    <div className='TilePlate'>
      <Button 
        variant="contained" 
        color="primary"
        onClick={() => {
          handleSwapSelectedTile({character, color, data})
          handleCloseForm();
        }}
      >
        {label}
      </Button>
      <span className="actions">
        <Button 
          color="secondary" 
          aria-label="remove tile"
          onClick={() => {handleRemoveTile(id)}}
        >
          <i className="material-icons">
            delete
          </i>
        </Button>
        <Button 
          color="secondary" 
          aria-label="edit tile"
          onClick={() => {handleToggleEdit(id)}}
        >
          <i className="material-icons">
            edit
          </i>
        </Button>
        { view_action }
      </span>
    </div>
  )
}

class TilePalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form_is_visible: false,
      editing_tile_id: null,
    };
  }

  drawTilePlates () {
    return this.props.tiles.map((tile, index) => {
      return (
        <TilePlate 
          key={index}
          id={tile.id}
          label={tile.label}
          color={tile.color}
          character={tile.character}
          data={{...tile.data}}
          can_view={tile.id !== this.props.viewed_tile_id}
          handleSwapSelectedTile={this.props.handleSwapSelectedTile}
          handleSwapViewedTile={this.props.handleSwapViewedTile}
          handleCloseForm={this.handleCloseForm.bind(this)}
          handleRemoveTile={this.handleRemoveTile.bind(this)}
          handleToggleEdit={this.handleToggleEdit.bind(this)}
        />
      )
    })
  }

  handleToggleForm () {
    this.setState({form_is_visible: !this.state.form_is_visible})
  }

  handleCloseForm () {
    this.setState({ form_is_visible: false, editing_tile_id: null})
  }

  handleToggleEdit (editing_tile_id) {
    this.setState({ editing_tile_id, form_is_visible: false,}, () => {this.setState({form_is_visible: true})})
  }

  handleAddTile (new_tile) {
    let tiles = [...this.props.tiles];
    let next_id = tiles.length > 0 ? tiles[tiles.length - 1].id + 1 : 1;
    let tile_id = {id: next_id};
    this.setState({
      form_is_visible: false,
    })
    this.props.handleSwapSelectedTile(new_tile)
    this.props.handleUpdateTilePaletteTiles(tiles.concat({ ...tile_id, ...new_tile }));
  }
  
  handleEditTile (new_tile, id) {
    let tiles = [...this.props.tiles].map((tile) => {
      if (tile.id === id) {
        new_tile.id = id;
        return {...id, ...new_tile}
      } else {
        return tile
      }
    });
    this.setState({
      form_is_visible: false,
      editing_tile_id: null,
    })
    this.props.handleSwapSelectedTile(new_tile)
    this.props.handleUpdateTilePaletteTiles(tiles);
  }

  handleRemoveTile (id) {
    let tiles = this.props.tiles.filter((tile) => tile.id !== id);
    this.setState({
      form_is_visible: false,
      editing_tile_id: null,
    });
    this.props.handleUpdateTilePaletteTiles(tiles);
  }

  render() {
    return (
      <div className="TilePalette tool-pane">
        <Grid container spacing={24}>
          <Grid item xs={12} sm={8}>
            <h5>Palette</h5>
            {this.drawTilePlates()}
          </Grid>
          <Grid item xs={12} sm={4}>
            <h5>Current Tile</h5>
            <TilePreview character={this.props.selected_tile.character} color={this.props.selected_tile.color} />
          </Grid>
        </Grid>
        <br />
        <Button 
          variant="outlined" 
          color="default" 
          className='btn-full-width'
          onClick={this.handleToggleForm.bind(this)}
        >
          {
            (this.state.form_is_visible)
            ? (
                <i className="material-icons">
                  close
                </i>
            )
            : (
                <i className="material-icons">
                  add
                </i>
            )
          }
        </Button>
        {
          this.state.form_is_visible && 
          (
            <TileForm 
              tiles={this.props.tiles}
              editing_tile_id={this.state.editing_tile_id}
              handleEditTile={this.handleEditTile.bind(this)}
              handleAddTile={this.handleAddTile.bind(this)}
            />
          )
        }
      </div>
    );
  }
}

export default TilePalette;