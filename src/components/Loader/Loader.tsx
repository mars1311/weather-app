'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <Loader2 className={styles.loader__spinner} size={48} />
    </div>
  );
};


export default Loader;