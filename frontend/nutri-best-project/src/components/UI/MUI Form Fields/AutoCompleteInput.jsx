import { TextField, FormControl, Autocomplete } from "@mui/material";
import { memo } from "react";

// eslint-disable-next-line react/prop-types
const AutoCompleteInput = memo(function AutoCompleteInput({ id, label, options, value, width, onChange, getOptionLabel, isOptionEqualToValue, renderOption }) {
    return (
        <FormControl fullWidth className={`mt-3 w-${width}`}>
            <Autocomplete
                id={id}
                options={options}
                getOptionLabel={getOptionLabel}
                renderInput={(params) => <TextField {...params} label={label} />}
                value={value}
                isOptionEqualToValue={isOptionEqualToValue}
                renderOption={renderOption}
                onChange={onChange}
            />
        </FormControl>
    );
});

export default AutoCompleteInput;