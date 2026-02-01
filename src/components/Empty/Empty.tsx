import React from 'react';
import { CloudMoon } from 'lucide-react';
import { EMPTY } from '@/constants/Empty';

import styles from './Empty.module.scss';

const Empty: React.FC = () => {
  return (
    <div className={styles.empty}>
      <CloudMoon size={48} className={styles.empty__icon} />
      <p className={styles.empty__title}>{EMPTY.TITLE}</p>
      <p className={styles.empty__text}>{EMPTY.TEXT}</p>
    </div>
  );
};

export default Empty;