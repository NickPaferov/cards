import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import { useState } from "react";

export const TestPage = () => {
  const [doubleRangeValue, setDoubleRangeValue] = useState([20, 37]);

  const handleDoubleRangeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setDoubleRangeValue(newValue as number[]);
  };

  return (
    <>
      <h1>Test</h1>
      <Button variant="contained">Contained</Button>
      <br />
      <br />
      <FormControl sx={{ minWidth: 80 }}>
        <InputLabel>Age</InputLabel>
        <Select label="Age">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      <Box sx={{ width: 300 }}>
        <Slider
          value={doubleRangeValue}
          onChange={handleDoubleRangeChange}
          valueLabelDisplay="auto"
        />
      </Box>
      <br />
      <br />
      <Box sx={{ width: 300 }}>
        <Slider valueLabelDisplay="auto" />
      </Box>
      <br />
      <br />
      <TextField label="Outlined" variant="outlined" />
      <br />
      <br />
      <FormControl>
        <FormLabel>Gender</FormLabel>
        <RadioGroup defaultValue="female">
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
      <br />
      <br />
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
        <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
      </FormGroup>
    </>
  );
};
