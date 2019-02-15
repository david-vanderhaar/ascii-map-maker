import React, { Component } from "react";
import Button from '@material-ui/core/Button';

export class Toolbar extends Component {
  render() {
    return (
      <div className='Toolbar'>
        <Button 
          className='btn-tool' 
          onClick={() => {this.props.onToolSwitch('pencil')}} 
          variant={this.props.tool_in_use === 'pencil' ? 'contained' : 'outlined'}
          color="secondary"
        >
          <i className="material-icons">
            edit
          </i>
        </Button>
        <Button 
          className='btn-tool' 
          onClick={() => { this.props.onToolSwitch('eraser')}}  
          variant={this.props.tool_in_use === 'eraser' ? 'contained' : 'outlined'} 
          color="secondary"
        >
          <i className="material-icons">
            indeterminate_check_box
          </i>
        </Button>
        <Button 
          className='btn-tool' 
          onClick={() => { this.props.onToolSwitch('filler')}}  
          variant={this.props.tool_in_use === 'filler' ? 'contained' : 'outlined'} 
          color="secondary"
        >
          <i className="material-icons">
            format_color_fill
          </i>
        </Button>
        <Button 
          className='btn-tool' 
          onClick={() => { this.props.onToolSwitch('box_paint')}} 
          variant={this.props.tool_in_use === 'box_paint' ? 'contained' : 'outlined'} 
          color="secondary"
          disabled
        >
          <i className="material-icons">
            select_all
          </i>
        </Button>
        <Button 
          className='btn-tool' 
          onClick={() => { this.props.onUndo()}}  
          variant='contained'
          color="secondary"
          disabled={this.props.tile_history_index >= this.props.tile_history.length - 1}
        >
          <i className="material-icons">
            undo
          </i>
        </Button>
        <Button 
          className='btn-tool' 
          onClick={() => { this.props.onRedo()}}  
          variant='contained'
          color="secondary"
          disabled={this.props.tile_history_index <= 0}
        >
          <i className="material-icons">
            redo
          </i>
        </Button>
      </div>
    );
  }
}

export default Toolbar