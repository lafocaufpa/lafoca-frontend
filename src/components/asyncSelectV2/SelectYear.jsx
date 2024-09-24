import Select from 'react-select';

const SelectYear = ({ id, label, value, onChange, ...props }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2011 + 1 }, (_, i) => ({
    value: 2011 + i,
    label: (2011 + i).toString(),
  }));
  
  return (
    <div className="form-group mb-3">
      <label htmlFor={id} className="fw-bold mb-1">{label}</label>
      <Select
        id={id}
        options={years}
        value={value}
        onChange={onChange}
        isClearable
        styles={{
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

export default SelectYear;