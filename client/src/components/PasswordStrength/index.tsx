import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UilCheckCircle, UilExclamationCircle } from '@iconscout/react-unicons';
import { useTranslation } from 'react-i18next';

import { PasswordStrengthLevels } from '@/components/SignupForm';

import styles from './styles.module.scss';

interface Props {
  passwordStrengthLevels: PasswordStrengthLevels;
}

const PasswordStrength: React.FC<Props> = ({ passwordStrengthLevels }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        {passwordStrengthLevels.length ? (
          <UilCheckCircle size={'12'} color={'#51aa4d'} />
        ) : (
          <UilExclamationCircle size={'12'} color={'#f25f25'} />
        )}
        <span className={cn(styles.message, passwordStrengthLevels.length && styles.valid)}>
          {t('Use 8 or more characters')}
        </span>
      </div>
      <div className={styles.messageContainer}>
        {passwordStrengthLevels.upperLowerCase ? (
          <UilCheckCircle size={'12'} color={'#51aa4d'} />
        ) : (
          <UilExclamationCircle size={'12'} color={'#f25f25'} />
        )}
        <span className={cn(styles.message, passwordStrengthLevels.upperLowerCase && styles.valid)}>
          {t('Use upper and lower case letters (e.g. aA)')}
        </span>
      </div>
      <div className={styles.messageContainer}>
        {passwordStrengthLevels.number ? (
          <UilCheckCircle size={'12'} color={'#51aa4d'} />
        ) : (
          <UilExclamationCircle size={'12'} color={'#f25f25'} />
        )}
        <span className={cn(styles.message, passwordStrengthLevels.number && styles.valid)}>
          {t('Use a number (e.g. 1234)')}
        </span>
      </div>
      <div className={styles.messageContainer}>
        {passwordStrengthLevels.symbol ? (
          <UilCheckCircle size={'12'} color={'#51aa4d'} />
        ) : (
          <UilExclamationCircle size={'12'} color={'#f25f25'} />
        )}
        <span className={cn(styles.message, passwordStrengthLevels.symbol && styles.valid)}>
          {t('Use a symbol (e.g. !@#$)')}
        </span>
      </div>
    </div>
  );
};

export default PasswordStrength;
