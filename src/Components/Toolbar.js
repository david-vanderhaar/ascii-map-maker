import React, { Component } from "react";
import Button from '@material-ui/core/Button';

export class Toolbar extends Component {
  render() {
    return (
      <div className='Toolbar'>
        <Button 
          className='btn-tool' 
          onClick={() => {this.props.onTogglePencil(this.props.selected_tile)}} 
          variant={!this.props.is_erasing ? 'contained' : 'outlined'}
          color="secondary"
        >
          <i className="material-icons">
            edit
          </i>
        </Button>
        <Button 
          className='btn-tool' 
          onClick={this.props.onToggleErasing} 
          variant={this.props.is_erasing ? 'contained' : 'outlined'} 
          color="secondary"
        >
          <i className="material-icons">
            indeterminate_check_box
          </i>
        </Button>
      </div>
    );
  }
}

export default Toolbar