import { AsyncPaginate } from 'react-select-async-paginate';

const AsyncSelect = ({
  loadOptions,
  placeholder,
  isMulti = false,
  value,
  onChange,
  additional = { page: 0 },
  ...rest
}) => {
  return (
    <AsyncPaginate
      isMulti={isMulti}
      loadOptions={loadOptions}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      additional={additional}
      styles={{
        menu: base => ({
          ...base,
          zIndex: 9999,
          cursor: 'pointer'
        }),
        menuList: base => ({
          ...base,
          maxHeight: '150px',
          overflowY: 'auto',
          cursor: 'pointer'
        }),
        control: (styles) => ({
          ...styles,
          cursor: 'pointer',
        }),
        dropdownIndicator: (styles) => ({
          ...styles,
          cursor: 'pointer'
        }),
        option: (styles, { isFocused, isSelected }) => ({
          ...styles,
          cursor: 'pointer',
          backgroundColor: isFocused ? '#d3d3d3' : 'transparent',
          ':active': {
            ...styles[':active'],
            backgroundColor: isSelected ? '#d3d3d3' : 'transparent',
          }
        }),
      }}
      {...rest}
    />
  );
};

export default AsyncSelect;