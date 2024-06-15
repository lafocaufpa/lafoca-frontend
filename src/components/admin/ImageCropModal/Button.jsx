'use client';

import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';

const Button = ({ variant, className, children, ...rest }) => {
  return (
    <button
      type="button"
      className={classNames(className, 'px-4 py-2 text-sm rounded-pill', {
        'btn btn-primary': variant === 'primary',
        'btn btn-danger': variant === 'secondary',
        'btn btn-light text-dark': variant === 'light'
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;