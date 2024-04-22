import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useSubmit } from 'react-router-dom';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const [value, setValue] = useState([20, 37]);
  const submit = useSubmit();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);

  };

  return (
    <div className="d-flex justify-content-center align-items-center py-2">
      <Box sx={{ width: 180, color: "grey" }} className="d-flex align-items-center">
        <Slider
          sx={{
            color: 'grey',
            '& .MuiSlider-thumb': {
              color: 'grey',
            },
            '& .MuiSlider-track': {
              backgroundColor: 'grey',
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#D8D8D8'
            }
          }}
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
      <div className="d-flex flex-column">
        <p className='d-flex justify-content-center align-items-center m-0 ps-3'>210</p>
        <p className='d-flex justify-content-center align-items-center m-0 ps-3'>BGN</p>
      </div>
    </div>
  );
}