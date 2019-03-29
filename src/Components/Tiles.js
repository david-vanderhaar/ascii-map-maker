import React, { Component } from "react";
import Konva from "konva";
import { Rect, Text, Group } from "react-konva";

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
    const obj_for_view = { character: this.props.character, color: this.props.color, data: this.props.data };
    const is_viewing = this.props.viewed_tile === JSON.stringify(obj_for_view);
    const viewing_offset = is_viewing * this.state.viewing_offset;
    const viewing_size_increase = is_viewing * this.state.viewing_size_increase;

    const tile = is_viewing 
    ? (
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={this.props.tile_size}
          height={this.props.tile_size}
          fill={this.props.color}
        />
    )
    : (
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
    )
    return (
      <Group>
        {tile}
      </Group>
    );
  }
}