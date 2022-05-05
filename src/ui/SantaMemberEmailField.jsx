import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

const SantaMemberEmailField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'black',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: 'blue',
        },
        // '-webkit-box-shadow': '0 0 0 100px gray inset',
    },
});

export default SantaMemberEmailField;