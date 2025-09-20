import PropTypes from 'prop-types';
import useAutocomplete from '@mui/material/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { Typography } from '@mui/material';

const Root = styled('div')(() => ({
  color: 'rgba(0,0,0,0.85)',
  fontSize: '14px',
  width: '100%',
}));

const Label = styled('label')(() => ({
  padding: '0 0 8px',
  lineHeight: 1.5,
  display: 'block',
  fontSize: '14px',
  fontWeight: 500,
  color: 'rgba(0,0,0,0.85)',
}));

const InputWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: '48px',
  border: "1px solid", 
  borderColor: "#DEE3E2", 
  backgroundColor: "#eceff9",
  borderRadius: '4px',
  padding: '8px 8px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '4px',
  transition: 'all 0.2s ease-in-out',
  cursor: 'text',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&.focused': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
  },
  '& input': {
    backgroundColor: 'transparent',
    color: 'rgba(0,0,0,.85)',
    height: '36px',
    boxSizing: 'border-box',
    padding: '8px 4px',
    width: '0',
    minWidth: '120px',
    flexGrow: 1,
    border: 0,
    margin: 0,
    outline: 0,
    fontSize: '14px',
    fontFamily: 'inherit',
    '&::placeholder': {
      color: 'rgba(0,0,0,0.4)',
      fontSize: '14px',
    },
  },
}));

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '32px',
  margin: '2px',
  lineHeight: '30px',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  boxSizing: 'border-box',
  padding: '0 8px 0 12px',
  outline: 0,
  overflow: 'hidden',
  fontSize: '13px',
  fontWeight: 500,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  '&:focus': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
  },
  '& span': {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '150px',
  },
  '& svg': {
    fontSize: '16px',
    cursor: 'pointer',
    padding: '2px',
    marginLeft: '4px',
    borderRadius: '50%',
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.2)',
    },
  },
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: '100%',
  margin: '4px 0 0',
  padding: '8px 0',
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: '#fff',
  overflow: 'auto',
  maxHeight: '280px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)',
  zIndex: 1000,
  border: '1px solid #e8e9ea',
  '& li': {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    fontSize: '14px',
    '& span': {
      flexGrow: 1,
      color: 'rgba(0,0,0,0.85)',
    },
    '& svg': {
      color: 'transparent',
      fontSize: '18px',
      transition: 'color 0.2s ease-in-out',
    },
  },
  "& li[aria-selected='true']": {
    backgroundColor: theme.palette.primary.main + '08',
    color: theme.palette.primary.main,
    fontWeight: 500,
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    paddingLeft: '13px',
    '& span': {
      color: theme.palette.primary.main,
    },
    '& svg': {
      color: theme.palette.primary.main,
    },
  },
  [`& li.${autocompleteClasses.focused}`]: {
    backgroundColor: '#f8f9fb',
    transform: 'translateY(-2px)',
    '& svg': {
      color: theme.palette.secondary.main,
    },
  },
  '& li:hover': {
    backgroundColor: '#f8f9fb',
    transform: 'translateY(-2px)',
  },
}));

export default function MultiSelect({search , setSearch , items , selectedData , setSelectedData , label}) {
    
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    value: selectedData,
    onChange: (event, newValue) => {
        setSelectedData(newValue);
    },
    defaultValue: [],
    multiple: true,
    options: items,
    getOptionLabel: (option) => option.name,
    inputValue : search,
    onInputChange: (event, newInputValue) => {
        setSearch(newInputValue);
    },
  });

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>
            <Typography variant="subtitle" color={"text.secondary"} fontWeight={500}> 
                {label} 
                {/* <span style={{ color: "red" }}>*</span> */}
            </Typography>
        </Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return <StyledTag key={key} {...tagProps} label={option.name} />;
          })}
          <input {...getInputProps()} placeholder="Search and select crops..." />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            return (
              <li key={key} {...optionProps}>
                <span>{option.name}</span>
                <CheckIcon fontSize="small" />
              </li>
            );
          })}
        </Listbox>
      ) : null}
    </Root>
  );
}
