import React from "react";

const TilePreview = ({ character, color}) => (
  <div className='TilePreview'>
    <span style={{color}}>
      {character}
    </span>
  </div>
);

export default TilePreview;