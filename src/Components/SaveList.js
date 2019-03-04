import React from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const SaveList = ({ saves, onDeleteSave, onLoadSave }) => (
  <div className='SaveList'>
    <Grid container spacing={24}>
      {
        saves.map((save, index) => {
          return (
            <Grid key={index} item xs={12}>
              <Button
                color="primary"
                variant='contained'
                aria-label="save"
                onClick={() => {
                  onLoadSave(save.id);
                }}
              >
                Load {save.timestamp.toString()}
              </Button>
              <Button
                color="secondary"
                variant='contained'
                aria-label="delete save"
                onClick={() => {
                  onDeleteSave(save.id);
                }}
              >
                <i className="material-icons">
                  delete
                </i>
              </Button>
            </Grid>
          )
        })
      }
    </Grid>
  </div>
);

export default SaveList;