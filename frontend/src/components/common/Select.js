import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

function SelectComponent({
  values,
  currentValue,
  onChange,
  title,
  fullWidth,
  margin = "none"
}) {
  return (
    <>
      <FormControl fullWidth={fullWidth}>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentValue}
          onChange={onChange}
          margin={margin}
        >
          <MenuItem value={''} disabled>-</MenuItem>
          {values.map(val => (
            <MenuItem
              key={val.id}
              value={val.id}
            >
              {val.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
};

export default SelectComponent;