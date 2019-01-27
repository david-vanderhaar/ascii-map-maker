import React, { Component } from "react";
import Konva from "konva";
import { Rect, Text } from "react-konva";

export class ColoredRect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "black"
    };
  }

  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };

  render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={this.props.tile_size - this.props.tile_gutter}
        height={this.props.tile_size - this.props.tile_gutter}
        fill={this.state.color}
        onClick={this.handleClick}
      />
    );
  }
}

export class TextTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: props.character,
      fill: props.color,
    };
  }

  handleClick = () => {
    this.props.handleUpdateTile(this.props.x, this.props.y)
  };

  handleMouseOver = () => {
    let new_state = {
      fill: 'red',
    }
    if (this.props.mouse_down) {
      this.props.handleUpdateTile(this.props.x, this.props.y)
    }
    this.setState(new_state);
  };

  handleMouseOut = () => {
    this.setState({
      fill: this.props.color
    });
  };

  render() {
    return (
      <Text
        text={this.props.character}
        fill={this.state.fill}
        x={this.props.x}
        y={this.props.y}
        fontSize={16}
        align='center'
        verticalAlign='middle'
        width={this.props.tile_size}
        height={this.props.tile_size}
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      />
    );
  }
}