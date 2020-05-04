import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SketchPicker } from 'react-color';

class TileForm extends Component {
  constructor(props) {
    super(props);
    let tile_to_edit = this.props.editing_tile_id ? this.props.tiles.filter((tile) => tile.id === this.props.editing_tile_id)[0] : null
    let tile_label = tile_to_edit ? tile_to_edit.label : '';
    let tile_character = tile_to_edit ? tile_to_edit.character : '';
    let tile_color = tile_to_edit ? tile_to_edit.color : '#fff';
    let tile_data = tile_to_edit ? JSON.stringify(tile_to_edit.data) : null;
    
    this.state = {
      tile_label,
      tile_character,
      tile_color,
      tile_data,
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleColorChange (color, event) {
    this.setState({tile_color: color.hex})
  }

  onSubmit () {
    let new_tile = {
      label: this.state.tile_label,
      character: this.state.tile_character,
      color: this.state.tile_color,
    }

    try {
      new_tile.data = JSON.parse(this.state.tile_data);
    } catch(e) {
      new_tile.data = this.state.tile_data;
    }
    
    if (this.props.editing_tile_id) {
      this.props.handleEditTile(new_tile, this.props.editing_tile_id)
    } else {
      this.props.handleAddTile(new_tile);
    }
  }

  render() {
    return (
      <div className='TileForm'>
        <div className='form row'>
          <TextField
            id="tile-label"
            label="Label"
            className={'text-field'}
            defaultValue={this.state.tile_label}
            onChange={this.handleChange('tile_label')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="tile-character"
            label="Character"
            className={'text-field'}
            defaultValue={this.state.tile_character}
            onChange={this.handleChange('tile_character')}
            margin="normal"
            variant="outlined"
          />
          <div className='form-label'>Color</div>
          <SketchPicker 
            width='initial'
            color={this.state.tile_color}
            onChangeComplete={this.handleColorChange.bind(this)}
          />
          <br />
          <TextField
            id="tile-data"
            label="Data"
            placeholder='{
              "type": "tree"
            }'
            multiline
            defaultValue={this.state.tile_data}
            onChange={this.handleChange('tile_data')}
            className={'text-field'}
            margin="normal"
            variant="outlined"
          />
          <Button 
            variant="outlined" 
            color="primary" 
            className='btn-full-width'
            onClick={this.onSubmit.bind(this)}
          >
            <i className="material-icons">
              save
            </i>
          </Button>
        </div>
      </div>
    );
  }
}

export default TileForm;