import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TileMap from "../TileMap";
import { convertTo2D } from "../../helper";

const EMPTY_TILE = { 
  id: null,
  type: 0,
  character: '',
  color: 'white',
  data: null
}

function initializeTiles(cols, rows) {
  return new Array(cols * rows).fill({ ...EMPTY_TILE })
}

function handleWfc(cols, rows, tiles) {
  console.log(tiles[0]);
  const res = convertTo2D(cols, rows, tiles)
  console.log(res);
}


export default function WfcMap({
  cols = 4,
  rows = 4,
  tile_size = 32,
  tile_gutter = 8,
  selected_tile
}) {
  const [tiles, setTiles] = useState(initializeTiles(cols, rows))
  
  return (
    <div style={{backgroundColor: '#4050b5'}}>
      <div style={{fontSize: '0.8125rem', color: '#fff', padding: 8, fontWeight: 600}}>
        WAVE FUNCTION COLLAPSE
      </div>
      <TileMap
        cols={cols} 
        rows={rows} 
        tiles={tiles} 
        tile_size={tile_size}
        tile_gutter={tile_gutter}
        selected_tile={{ ...selected_tile }}
        viewed_tile={''}
        onUpdateTiles={setTiles}
        tool_in_use={'pencil'}
        empty_tile={EMPTY_TILE}
      />
      <Button 
        aria-label="execute wfc"
        variant="contained" 
        color="primary" 
        className='btn-full-width'
        onClick={() => handleWfc(cols, rows, tiles)}
      >
        Exectue
      </Button>
    </div>
  )
}