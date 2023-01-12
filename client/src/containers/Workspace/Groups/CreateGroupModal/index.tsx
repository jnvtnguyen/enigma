import React from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import CreateGroupModalForm from './CreateGroupModalForm';
import styles from './styles.module.scss';

type Props = {
  onClose: () => void;
};

const CreateGroupModal: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();

  const renderFooter = () => {
    return (
      <div className={styles.footer}>
        <span></span>
        <div className={styles.buttons}>
          <Button size="small" theme="secondary" onClick={onClose}>
            {t('Cancel')}
          </Button>
          <Button size="small" className={styles.createButton}>
            {t('Confirm')}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal header={t('Create Group')} footer={renderFooter()} onClose={onClose}>
      <CreateGroupModalForm />
    </Modal>
  );
};

export default CreateGroupModal;
