import React, {useState} from 'react'
import classes from './ModalOptions.module.scss';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, optionName, theme) {
  return {
    fontWeight:
      optionName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function ModalOptions(props) {
  const theme = useTheme();
  const [optionName, setoptionName] = useState([]);

  const handleChange = (event) => {
    const { target: { value }, } = event;
    setoptionName(typeof value === 'string' ? value.split(',') : value);
    props.onUpdate(typeof value === 'string' ? value.split(',') : value);
  };
  
  const names = props.options;

  return (
    <div>
      <p1>{props.title}</p1>
      <FormControl sx={{ m: 0, width: '100%', marginTop: '5%', marginBottom: '5%' }}>
        <InputLabel id="demo-multiple-chip-label">{props.title}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={optionName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name.name}
              value={name.name}
              style={getStyles(name, optionName, theme)}
            >
              +${name.price.toFixed(2)} {name.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default ModalOptions