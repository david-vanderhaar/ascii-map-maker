import React, { Component } from "react";
import TileForm from './TileForm';
import Button from '@material-ui/core/Button';

const TilePlate = ({label, color, character, data, handleSwapSelectedTile}) => (
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
    <Button color="secondary" aria-label="Edit tile">
      <i className="material-icons">
        edit
      </i>
    </Button>
    <Button color="secondary" aria-label="remove tile">
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
          label={tile.label}
          color={tile.color}
          character={tile.character}
          data={{...tile.data}}
          handleSwapSelectedTile={this.props.handleSwapSelectedTile}
        />
      )
    })
  }

  handleToggleForm () {
    this.setState({form_is_visible: !this.state.form_is_visible})
  }

  handleAddTile (new_tile) {
    let tiles = [...this.state.tiles];
    tiles.push({...new_tile});
    this.setState({
      tiles,
      form_is_visible: false,
    })
  }

  render() {
    return (
      <div className="TilePalette">
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