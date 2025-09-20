import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#eceff9',
    '& fieldset': {
      borderColor: '#DEE3E2',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
    },
  },
  '& .MuiAutocomplete-option[aria-selected="true"]': {
    backgroundColor: `${theme.palette.primary.main}08`,
    color: theme.palette.primary.main,
    fontWeight: 500,
    borderLeft: `3px solid ${theme.palette.primary.main}`,
  },
  '& .MuiAutocomplete-option:hover': {
    backgroundColor: '#f8f9fb',
  }
}));

export default function SingleSelect({
  value,
  onChange,
  options,
  label,
  placeholder = "Search and select...",
  inputValue,
  onInputChange
}) {
  return (
    <StyledAutocomplete
      value={value}
      onChange={onChange}
      inputValue={inputValue}
      onInputChange={onInputChange}
      options={options}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      disablePortal
      renderInput={(params) => (
        <TextField 
          {...params} 
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
}

SingleSelect.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func
};
