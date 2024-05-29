import { TextField, FormControl, Autocomplete, FormHelperText } from "@mui/material";
import { memo } from "react";

// eslint-disable-next-line react/prop-types
const AutoCompleteInput = memo(function AutoCompleteInput({ id, label, options, value, width, onChange, getOptionLabel, isOptionEqualToValue, renderOption, error }) {
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
            {error && <FormHelperText className="text-danger">{error}</FormHelperText>}
        </FormControl>
    );
});

export default AutoCompleteInput;