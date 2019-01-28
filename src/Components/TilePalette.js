import React, { Component } from "react";
import TileForm from './TileForm';
import Button from '@material-ui/core/Button';

const TilePlate = ({id, label, color, character, data, handleSwapSelectedTile, handleRemoveTile}) => (
  <div className='TilePlate'>
    <Button 
      variant="contained" 
      color="primary"
      onClick={() => {
        handleSwapSelectedTile({character, color, data})
      }}
    >
      {label}
    </Button>
    <Button 
      color="secondary" 
      aria-label="remove tile"
      onClick={() => {handleRemoveTile(id)}}
    >
      <i className="material-icons">
        delete
      </i>
    </Button>
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
        }
      ],
      form_is_visible: false,
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
          handleRemoveTile={this.handleRemoveTile.bind(this)}
        />
      )
    })
  }

  handleToggleForm () {
    this.setState({form_is_visible: !this.state.form_is_visible})
  }

  handleAddTile (new_tile) {
    let tiles = [...this.state.tiles];
    let next_id = tiles.length > 0 ? tiles[tiles.length - 1].id + 1 : 1;
    let tile_id = {id: next_id};
    tiles.push({...tile_id, ...new_tile});
    this.setState({
      tiles,
      form_is_visible: false,
    })
  }

  handleRemoveTile (id) {
    let tiles = this.state.tiles.filter((tile) => tile.id !== id);
    this.setState({tiles});
  }

  render() {
    return (
      <div className="TilePalette tool-pane">
        <h4>Palette</h4>
        {this.drawTilePlates()}
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
          this.state.form_is_visible && <TileForm handleAddTile={this.handleAddTile.bind(this)}/>
        }
      </div>
    );
  }
}

export default TilePalette;