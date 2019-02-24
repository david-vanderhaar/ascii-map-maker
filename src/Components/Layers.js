import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LayerForm from './LayerForm';

class LayerPlate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layer_name: props.layer.name,
      is_editing: false,
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  toggleEdit (value) {
    this.setState({is_editing: value})
  }

  onSubmit() {
    this.setState({ layer_name: '', is_editing: false })
    this.props.handleEditLayer(this.props.layer.id, this.state.layer_name)
  }

  render () {
    if (this.state.is_editing) {
      return (
        <div className='layer-edit-form'>
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
            onClick={this.onSubmit.bind(this)}
          >
            <i className="material-icons">
              save
                </i>
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {this.toggleEdit(false)}}
          >
            <i className="material-icons">
              close
            </i>
          </Button>
        </div>
      )
    }
    return (
      <div className='LayerPlate'>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.props.handleSwapLayer(this.props.layer.id)
          }}
        >
          {this.props.layer.name}
        </Button>
        {
          this.props.layer.deletable && (
            <span className="actions">
              <Button
                color="secondary"
                aria-label="remove layer"
                onClick={() => { this.props.handleRemoveLayer(this.props.layer.id) }}
              >
                <i className="material-icons">
                  delete
                </i>
              </Button>
              <Button
                color="secondary"
                aria-label="edit layer"
                onClick={() => {this.toggleEdit(true)}}
              >
                <i className="material-icons">
                  edit
                </i>
              </Button>
            </span>
          )
        }
      </div>
    )
  }
}

class Layers extends Component {

  render() {
    return (
      <div className="Layers tool-pane">
        <h4>Layers</h4>
        {this.props.layers.map((layer, index) => {
          return (
            <div key={index} className={index === this.props.current_layer ? 'layer-selected' : ''}>
              <LayerPlate 
                layer={layer}
                handleSwapLayer={this.props.handleSwapLayer}
                handleRemoveLayer={this.props.handleRemoveLayer}
                handleEditLayer={this.props.handleEditLayer}
              />
            </div>
          )
        })}
        <hr/>
        <LayerForm handleAddLayer={this.props.handleAddLayer}/>
      </div>
    );
  }
}

export default Layers;