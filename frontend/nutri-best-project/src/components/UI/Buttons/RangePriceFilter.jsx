import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useSubmit } from 'react-router-dom';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const timeoutRef = useRef(null);
  const [value, setValue] = useState([0, Number(sessionStorage.getItem("maxPrice"))]);
  const submit = useSubmit();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    sessionStorage.setItem("priceRange", `${newValue[0]} ${newValue[1]}`);

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      return submit(null, { action: "/products/all", method: "get" });
    }, 1000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-2">
      <Box sx={{ width: 180, color: "grey" }} className="d-flex align-items-center">
        <Slider
          min={0}
          max={Number(sessionStorage.getItem("maxPrice"))}
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
        <p className='d-flex justify-content-center align-items-center m-0 ps-3'>{sessionStorage.getItem("maxPrice")}</p>
        <p className='d-flex justify-content-center align-items-center m-0 ps-3'>BGN</p>
      </div>
    </div>
  );
}