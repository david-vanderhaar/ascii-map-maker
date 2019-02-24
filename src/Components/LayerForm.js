import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LayerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layer_name: '',
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  onSubmit () {
    let new_layer = {
      name: this.state.layer_name,
    }
    this.setState({layer_name: ''})
    this.props.handleAddLayer(new_layer);
  }

  render() {
    return (
      <div className='LayerForm'>
        <div className='form row'>
          <TextField
            id="layer-name"
            label="Name"
            className={'text-field'}
            value={this.state.layer_name}
            onChange={this.handleChange('layer_name')}
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

export default LayerForm;