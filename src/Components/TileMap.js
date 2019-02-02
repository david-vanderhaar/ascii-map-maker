import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import * as Tiles from './Tiles.js';

class TileMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouse_down: false,
    };
  }

  getTile (col, row) {
    return this.props.tiles[row * this.props.cols + col]
  }

  drawTiles () {
    let tiles = [];
    for (let c = 0; c < this.props.cols; c++) {
      for (let r = 0; r < this.props.rows; r++) {
        let tile = this.getTile(c, r);
        tiles.push(
          <Tiles.TextTile
            key={`${c}-${r}`}
            x={c * this.props.tile_size}
            y={r * this.props.tile_size}
            character={tile.character}
            color={tile.color}
            tile_size={this.props.tile_size}
            mouse_down={this.state.mouse_down}
            onUpdateTile={this.handleUpdateTile.bind(this)}
          />
        )
      }
    }
    
    return tiles;
  }

  handleUpdateTile (x, y) {
    const col = x / this.props.tile_size;
    const row = y / this.props.tile_size;
    let tiles = this.props.tiles;
    tiles[row * this.props.cols + col] = this.props.is_erasing
      ? ({...this.props.empty_tile})
      : ({
          type: 1,
          character: this.props.selected_tile.character,
          color: this.props.selected_tile.color,
        });
    this.props.onUpdateTiles(tiles)
  }

  handleMouseDown () {
    this.setState({mouse_down: true})
  }

  handleMouseUp () {
    this.setState({mouse_down: false})
  }

  render() {
    return (
      <div className='TileMap'>
        <Stage 
          width={this.props.cols * this.props.tile_size} 
          height={this.props.rows * this.props.tile_size}
          onMouseDown={this.handleMouseDown.bind(this)} 
          onMouseUp={this.handleMouseUp.bind(this)}
        >
          <Layer>
            {
              this.drawTiles().map((tile) => {
                return tile;
              })
            }
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default TileMap;
