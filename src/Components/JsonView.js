import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const getTile = (totalCols, col, row, tiles) => {
  return tiles[row * totalCols + col]
}

const convertTileArrayToObj = (cols, rows, tiles) => {
  let tileObject = {};
  new Array(cols).fill(null).forEach((empty, c) => {
    new Array(rows).fill(null).forEach((empty, r) => {
      let tile = getTile(cols, c, r, tiles);
      tileObject[`${c},${r}`] = tile;
    })
  })
  return tileObject;
}

const JsonView = ({ cols, rows, tiles }) => (
  <div className='JsonView'>
    <Grid container spacing={24}>
      <Grid item xs={12} sm={4}>
        <Button
          color="primary"
          variant='contained'
          aria-label="copy"
          onClick={() => { 
            document.getElementById('json-export-data').select();
            document.execCommand("copy");
          }}
        >
          Copy to Clipboard 
        </Button>
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
          id="json-export-data"
          label="Json"
          multiline
          fullWidth
          rowsMax="8"
          value={JSON.stringify({
            cols,
            rows,
            tiles: convertTileArrayToObj(cols, rows, tiles),
          })}
          margin="normal"
          variant="outlined"
        />
      </Grid>
    </Grid>
  </div>
);

export default JsonView;