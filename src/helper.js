export function convertTo2D(total_columns, total_rows, array) {
  let result = new Array(total_rows);
  for (let i = 0; i < total_rows; i++) {
    result[i] = new Array(total_columns);
    for (let j = 0; j < total_columns; j++) {
      result[i][j] = array[i * total_columns + j];
    }
  }
  return result;
}

export function flatten2DArray(array) {
  return array.reduce((flatArray, row) => flatArray.concat(row), []);
}

export const getTile = (totalCols, col, row, tiles) => {
  return tiles[row * totalCols + col]
}

export const convertTileArrayTo2DArray = (cols, rows, tiles) => {
  return new Array(cols).fill(null).map((empty, c) => {
    return new Array(rows).fill(null).map((empty, r) => {
      return getTile(cols, c, r, tiles);
    })
  })
}

export const convertTileArrayToObj = (cols, rows, tiles) => {
  let tileObject = {};
  new Array(cols).fill(null).forEach((empty, c) => {
    new Array(rows).fill(null).forEach((empty, r) => {
      let tile = getTile(cols, c, r, tiles);
      tileObject[`${c},${r}`] = tile;
    })
  })
  return tileObject;
}