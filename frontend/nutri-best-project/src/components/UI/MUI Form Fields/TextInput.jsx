import { TextField, FormHelperText } from "@mui/material";
import { memo } from "react";

// eslint-disable-next-line react/prop-types
const TextInput = memo(function TextInput({ id, label, value, styles, onChange, error, ...props }) {
    return (
        <TextField
            fullWidth
            className={`mt-3 ${styles}`}
            id={id}
            name={id}
            label={label}
            value={value}
            onChange={onChange}
            {...props}
            error={error && <FormHelperText className="text-danger">{error}</FormHelperText>}
        />

    );
});

export default TextInput;