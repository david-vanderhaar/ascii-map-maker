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

  floodFillUtil (cols, rows, tiles, x, y, prev_tile, new_tile)
  {
    let current_tile = tiles[y * cols + x];
    // Base cases 
    if (x < 0 || x >= cols || y < 0 || y >= rows) { return tiles; }
    if (JSON.stringify(current_tile) !== JSON.stringify(prev_tile)) { return tiles; }
    
    // Replace the color at (x, y) 
    tiles[y * cols + x] = JSON.parse(JSON.stringify(new_tile));
    
    // Recur for north, east, south and west 
    this.floodFillUtil(cols, rows, tiles, x + 1, y, prev_tile, new_tile);
    this.floodFillUtil(cols, rows, tiles, x - 1, y, prev_tile, new_tile);
    this.floodFillUtil(cols, rows, tiles, x, y + 1, prev_tile, new_tile);
    this.floodFillUtil(cols, rows, tiles, x, y - 1, prev_tile, new_tile);

    return tiles;
  }

  // It mainly finds the previous color on (x, y) and 
  floodFill (cols, rows, tiles, x, y, new_tile)
  {
    let prev_tile = tiles[y * cols + x]
    return this.floodFillUtil(cols, rows, tiles, x, y, prev_tile, new_tile);
  } 

  handleUpdateTile (x, y) {
    const col = x / this.props.tile_size;
    const row = y / this.props.tile_size;
    let tiles = JSON.parse(JSON.stringify(this.props.tiles)); // cheap deep clone

    switch (this.props.tool_in_use) {
      case 'pencil':
        tiles[row * this.props.cols + col] = ({
          type: 1,
          character: this.props.selected_tile.character,
          color: this.props.selected_tile.color,
        });
        break;
      case 'eraser':
        tiles[row * this.props.cols + col] = ({ ...this.props.empty_tile })
        break;
      case 'filler':
        if (JSON.stringify(tiles[row * this.props.cols + col]) !== JSON.stringify(this.props.selected_tile)) {
          tiles = this.floodFill(this.props.cols, this.props.rows, tiles, col, row, this.props.selected_tile)
        }
        break;
      default:
        tiles[row * this.props.cols + col] = ({
          type: 1,
          character: this.props.selected_tile.character,
          color: this.props.selected_tile.color,
        });
    }
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
