import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: props.cols,
      rows: props.rows,
      grid_min: 1,
      grid_max: 50,
    }
  }

  handleGridChange = name => event => {
    let new_size = parseInt(event.target.value) ? parseInt(event.target.value) : this.state.grid_min;
    this.setState({
      [name]: new_size,
    }, () => {
      if (new_size < this.state.grid_min) {
        this.setState({[name]: this.state.grid_min})
      } else if (new_size > this.state.grid_max) {
        this.setState({[name]: this.state.grid_max})
      }
    });
  };

  onSubmit () {
    let cols = this.state.cols
    let rows = this.state.rows
    if (cols !== this.props.cols || rows !== this.props.rows) {
      let tiles = [];
      new Array(cols).fill(this.props.empty_tile).map((empty, r) => {
        return new Array(rows).fill(this.props.empty_tile).map((empty, c) => {
          tiles.push(JSON.parse(JSON.stringify(this.props.empty_tile)))
        })
      })
      this.props.onUpdateGridSize(cols, rows, tiles);
    }
  }

  render() {
    return (
      <div className='Settings tool-pane'>
        <div className='form row'>
          <div className='inline-group'>
            <TextField
              id="cols"
              label="cols"
              className={'text-field grid-field'}
              value={this.state.cols}
              onChange={this.handleGridChange('cols')}
              margin="normal"
              variant="outlined"
              type="number"
            />
            <TextField
              id="rows"
              label="Rows"
              className={'text-field grid-field'}
              value={this.state.rows}
              onChange={this.handleGridChange('rows')}
              margin="normal"
              variant="outlined"
              type="number"
            />
          </div>
          {
            (this.props.cols !== this.state.cols || this.props.rows !== this.state.rows)
            ? (
              <Grow in={this.props.cols !== this.state.cols || this.props.rows !== this.state.rows}>
                <p className="red-text">
                  WARNING
                  This action will clear the current grid of all tiles
                </p>
              </Grow>
            )
            : (
              null
            )
          }
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
          <br />
        </div>
      </div>
    );
  }
}

export default Settings;