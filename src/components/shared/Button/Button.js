import React from 'react';
import styles from './Button.scss';

export const Button = ({ classes = '', disabled, loading, onClick, children }) => (
  <button
    className={`${styles.Button} ${loading === true ? styles.ButtonLoading : ''} ${classes}`}
    disabled={disabled || loading}
    onClick={onClick}
  >
    {children}
  </button>
);
