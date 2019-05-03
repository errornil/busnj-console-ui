import React from 'react';
import styles from './NotFound.scss';

export const NotFound = () => (
  /* jshint ignore:start */
  <div className={styles.NotFound}>
    <div className={styles.Header}>404</div>
    <div className={styles.Body}>
      <div className={styles.Message}>
        Message
      </div>
    </div>
  </div>
  /* jshint ignore:end */
);
