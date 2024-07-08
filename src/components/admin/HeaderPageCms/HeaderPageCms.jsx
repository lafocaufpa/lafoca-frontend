import React from 'react';

const HeaderPageCms = ({ IconComponent, iconProps, title, size = '40' }) => {
  return (
    <div className='d-flex align-items-baseline'>
      <IconComponent className='me-1' width={size} height={size} {...iconProps} />
      <h1 className="mb-0">{title}</h1>
    </div>
  );
};

export default HeaderPageCms;
