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
    let tiles = new Array(this.props.cols).fill(null).map((empty, c) => {
      return new Array(this.props.rows).fill(null).map((empty, r) => {
        let tile = this.getTile(c, r);
        const is_viewing = false;
        
        return (
          <Tiles.TextTile
            key={`${c}-${r}`}
            is_viewing={is_viewing}
            viewed_tile={this.props.viewed_tile}
            x={c * this.props.tile_size}
            y={r * this.props.tile_size}
            character={tile.character}
            color={tile.color}
            data={tile.data}
            tile_size={this.props.tile_size}
            mouse_down={this.state.mouse_down}
            onUpdateTile={this.handleUpdateTile.bind(this)}
          />
        )
      })
    })
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
    const currentTile = JSON.stringify(tiles[row * this.props.cols + col])
    let tile_changed = false;
    switch (this.props.tool_in_use) {
      default:
      case 'pencil':
        const newTile = {
          type: 1,
          character: this.props.selected_tile.character,
          color: this.props.selected_tile.color,
          data: this.props.selected_tile.data,
        }
        if (currentTile !== JSON.stringify(newTile)) {
          tiles[row * this.props.cols + col] = (newTile);
          tile_changed = true;
        }
        break;
      case 'eraser':
        if (currentTile !== JSON.stringify(this.props.empty_tile)) {
          tiles[row * this.props.cols + col] = ({ ...this.props.empty_tile })
          tile_changed = true;
        }
        break;
      case 'filler':
        if (JSON.stringify(tiles[row * this.props.cols + col]) !== JSON.stringify(this.props.selected_tile)) {
          tiles = this.floodFill(this.props.cols, this.props.rows, tiles, col, row, {...this.props.selected_tile, data: this.props.selected_tile.data})
        }
        tile_changed = true;
        break;
    }

    if (tile_changed) this.props.onUpdateTiles(tiles)
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
