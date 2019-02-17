import React, { Component } from "react";
import TileForm from './TileForm';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TilePreview from './TilePreview';

const TilePlate = ({ id, label, color, character, data, handleSwapSelectedTile, handleCloseForm, handleRemoveTile, handleToggleEdit}) => (
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
    </span>
  </div>
)

class TilePalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [
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
      form_is_visible: false,
      editing_tile_id: null,
    };
  }

  drawTilePlates () {
    return this.state.tiles.map((tile, index) => {
      return (
        <TilePlate 
          key={index}
          id={tile.id}
          label={tile.label}
          color={tile.color}
          character={tile.character}
          data={{...tile.data}}
          handleSwapSelectedTile={this.props.handleSwapSelectedTile}
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
    let tiles = [...this.state.tiles];
    let next_id = tiles.length > 0 ? tiles[tiles.length - 1].id + 1 : 1;
    let tile_id = {id: next_id};
    this.setState({
      tiles: tiles.concat({ ...tile_id, ...new_tile }),
      form_is_visible: false,
    })
    this.props.handleSwapSelectedTile(new_tile)
  }
  
  handleEditTile (new_tile, id) {
    let tiles = [...this.state.tiles].map((tile) => {
      if (tile.id === id) {
        new_tile.id = id;
        return {...id, ...new_tile}
      } else {
        return tile
      }
    });
    this.setState({
      tiles,
      form_is_visible: false,
      editing_tile_id: null,
    })
    this.props.handleSwapSelectedTile(new_tile)
  }

  handleRemoveTile (id) {
    let tiles = this.state.tiles.filter((tile) => tile.id !== id);
    this.setState({
      tiles,
      form_is_visible: false,
      editing_tile_id: null,
    });
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
              tiles={this.state.tiles}
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