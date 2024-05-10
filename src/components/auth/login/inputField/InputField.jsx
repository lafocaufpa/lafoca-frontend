import React, { useState } from 'react';
import styles from './InputField.module.css';
import EyeOpen from '@images/icons/EyeOpen.svg';
import EyeHide from '@images/icons/EyeHide.svg';
import Image from 'next/image';

const InputField = ({ label, type, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.input}>
      <label>{label}</label>
      <div className={styles.inputWrapper}>
        <input type={type === 'password' && showPassword ? 'text' : type} name={name} required />
        {type === 'password' && (
       
          <Image src={showPassword ? EyeHide : EyeOpen} onClick={togglePasswordVisibility} alt=''/>
        )}
      </div>
    </div>
  );
};

export default InputField;
