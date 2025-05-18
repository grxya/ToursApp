'use client';

import React from 'react';
import { RedirectProps } from '@/types';

const RedirectToRegister: React.FC<RedirectProps> = ({ children }) => {
  const handleClick = () => {
    window.location.assign('/auth/register'); 
  };

  return (
    <div onClick={handleClick} style={{ display: 'inline-block', cursor: 'pointer' }}>
      {children}
    </div>
  );
};

export default RedirectToRegister;
