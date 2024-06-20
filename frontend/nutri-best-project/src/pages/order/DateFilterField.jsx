import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';

// eslint-disable-next-line react/prop-types
export default function DateFilterField({ setDate, label, identifier }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
        setDate(identifier, newValue)
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label={label}
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}