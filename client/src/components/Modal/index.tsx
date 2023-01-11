import React, { useCallback } from 'react';
import { Portal } from 'react-portal';

import styles from './styles.module.scss';

type Props = {
  header: string;
  onClose: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

const Modal: React.FC<Props> = ({ header, onClose, children, footer }) => {
  const onBlanketClick = (e: React.MouseEvent) => {
    if (
      e.target instanceof Node &&
      e.currentTarget.contains(e.target) &&
      e.currentTarget != e.target
    ) {
      return;
    }

    onClose();
  };

  return (
    <React.Fragment>
      <Portal>
        <div className={styles.blanket} onClick={onBlanketClick}>
          <div className={styles.modal}>
            <div className={styles.content} tabIndex={-1}>
              <div className={styles.header}>
                <h1 className={styles.headerText}>{header}</h1>
              </div>
              <div className={styles.innerContent}>{children}</div>
              <div className={styles.footer}>{footer}</div>
            </div>
          </div>
        </div>
      </Portal>
    </React.Fragment>
  );
};

export default Modal;
