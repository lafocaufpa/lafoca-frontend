import { AsyncPaginate } from 'react-select-async-paginate';

const AsyncSelect = ({ service, id, label, loadOptions, additionalProps, ...props }) => {
  const loadOptionsHandler = (inputValue, loadedOptions, additional) => {
    return loadOptions(service, inputValue, loadedOptions, additional);
  };

  return (
    <div className="form-group mb-3">
      <label htmlFor={id} className="fw-bold mb-1">{label}</label>
      <AsyncPaginate
        loadOptions={loadOptionsHandler}
        additional={additionalProps}
        isClearable
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
        {...props}
      />
    </div>
  );
};

export default AsyncSelect;