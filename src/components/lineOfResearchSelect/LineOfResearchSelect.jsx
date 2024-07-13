'use client';

import { AsyncPaginate } from 'react-select-async-paginate';
import IconUp from '../icon/IconUp';
import IconDown from '../icon/IconDown';
import styles from './LineOfResearchSelect.module.css';
import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';

const LineOfResearchSelect = ({ id, label, loadOptions, additionalProps, ...props }) => {
  const loadOptionsHandler = (inputValue, loadedOptions, additional) => {
    return loadOptions(linesOfResearchService, inputValue, loadedOptions, additional);
  };

  return (
    <div className={`${styles.formGroup} form-group mb-3`}>
      <label htmlFor={id} className={`${styles.label} fw-bold mb-1`}>{label}</label>
      <AsyncPaginate
        loadOptions={loadOptionsHandler}
        additional={additionalProps}
        isClearable
        styles={{
          menu: base => ({
            ...base,
            zIndex: 9999,
            cursor: 'pointer',
          }),
          menuList: base => ({
            ...base,
            maxHeight: '150px',
            overflowY: 'auto',
            cursor: 'pointer',
            textAlign: 'left',
            '::-webkit-scrollbar': {
              display: 'none'
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            boxShadow: '30px 87px 26px 0px rgba(0, 0, 0, 0.00), 19px 56px 24px 0px rgba(0, 0, 0, 0.01), 11px 31px 20px 0px rgba(0, 0, 0, 0.05), 5px 14px 15px 0px rgba(0, 0, 0, 0.09), 1px 3px 8px 0px rgba(0, 0, 0, 0.10)',
          }),
          placeholder: base => ({
            ...base,
            color: ''
          }),
          singleValue: styles => ({
            ...styles,
            textAlign: 'left'
          }),
          control: (styles, { isFocused }) => ({
            ...styles,
            textAlign: 'left',
            minHeight: '41px',
            padding: '8px 8px',
            cursor: 'pointer',
            border: '0.5px solid rgba(0, 0, 0, 0.3)',
            borderRadius: '5px',
            background: '#FFF',
            ':hover': {
              borderColor: 'rgba(0, 0, 0, 0.65)'
            },
          }),
          loadingIndicator: (styles) => ({
            ...styles,
            '& span': {
              color: 'rgb(204, 204, 204)'
            }
          }),
          indicatorsContainer: styles => ({
            ...styles,
            'svg': {
              color: 'black'
            },
          }),
          dropdownIndicator: (styles, { isFocused }) => ({
            ...styles,
            cursor: 'pointer',
            transform: isFocused ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
          }),
          indicatorSeparator: base => ({
            ...base,
            backgroundColor: 'transparent'
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
        components={{
          DropdownIndicator: ({ selectProps }) => (
            <>
              {selectProps.menuIsOpen ? <IconUp /> : <IconDown />}
            </>
          )
        }}
        {...props}
      />
    </div>
  );
};

export default LineOfResearchSelect;
