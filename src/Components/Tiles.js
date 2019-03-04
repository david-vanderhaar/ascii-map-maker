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
      hover_fill: 'red',
      is_hovering: false,
      viewing_offset: -16,
      viewing_size_increase: 8,
    };
  }

  handleClick = () => {
    this.props.onUpdateTile(this.props.x, this.props.y)
  };

  handleMouseOver = () => {
    let new_state = {
      is_hovering: true,
    }
    if (this.props.mouse_down) {
      this.props.onUpdateTile(this.props.x, this.props.y)
    }
    this.setState(new_state);
  };

  handleMouseOut = () => {
    this.setState({
      is_hovering: false,
    });
  };

  render() {
    const viewing_offset = this.props.is_viewing * this.state.viewing_offset;
    const viewing_size_increase = this.props.is_viewing * this.state.viewing_size_increase;

    return (
      <Text
        text={this.props.character}
        fill={this.state.is_hovering ? this.state.hover_fill: this.props.color}
        x={this.props.x + viewing_offset}
        y={this.props.y + viewing_offset}
        fontSize={16 + viewing_size_increase}
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