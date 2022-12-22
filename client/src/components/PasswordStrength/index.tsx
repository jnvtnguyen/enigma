import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UilCheckCircle, UilExclamationCircle } from '@iconscout/react-unicons';

import styles from './styles.module.scss';

interface Props {
  password: string;
  onPasswordStrengthChange: (passwordStrong: boolean) => any;
}

interface PasswordStrengthLevels {
  length: boolean;
  upperLowerCase: boolean;
  number: boolean;
  symbol: boolean;
}

const PasswordStrength: React.FC<Props> = ({ password, onPasswordStrengthChange }) => {
  const [passwordStrengthLevels, setPasswordStrengthLevels] = useState<PasswordStrengthLevels>({
    length: false,
    upperLowerCase: false,
    number: false,
    symbol: false
  });

  const [isPasswordStrong, setIsPasswordStrong] = useState<boolean>(false);

  const validatePasswordStrength = (): boolean => {
    let passwordStrong: boolean = true;

    setPasswordStrengthLevels({
      length: true,
      upperLowerCase: true,
      number: true,
      symbol: true
    });

    if (!(password.length >= 8)) {
      setPasswordStrengthLevels((prevState) => ({
        ...prevState,
        length: false
      }));
      passwordStrong = false;
    }

    if (!/^(?=.*[A-Z]).*(?=.*[a-z]).*$/.test(password)) {
      setPasswordStrengthLevels((prevState) => ({
        ...prevState,
        upperLowerCase: false
      }));
      passwordStrong = false;
    }

    if (!/^(?=.*[0-9]).*$/.test(password)) {
      setPasswordStrengthLevels((prevState) => ({
        ...prevState,
        number: false
      }));
      passwordStrong = false;
    }

    if (!/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(password)) {
      setPasswordStrengthLevels((prevState) => ({
        ...prevState,
        symbol: false
      }));
      passwordStrong = false;
    }

    return passwordStrong;
  };

  useEffect(() => {
    const passwordStrong: boolean = validatePasswordStrength();

    setIsPasswordStrong(passwordStrong);
    onPasswordStrengthChange(passwordStrong);
  }, [password]);

  if (isPasswordStrong) return;

  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        {passwordStrengthLevels.length ? (
          <UilCheckCircle size={'12'} color={'#51aa4d'} />
        ) : (
          <UilExclamationCircle size={'12'} color={'#f25f25'} />
        )}
        <span className={cn(styles.message, passwordStrengthLevels.length && styles.valid)}>
          Use 8 or more characters
        </span>
      </div>
      <div className={styles.messageContainer}>
        {passwordStrengthLevels.upperLowerCase ? (
          <UilCheckCircle size={'12'} color={'#51aa4d'} />
        ) : (
          <UilExclamationCircle size={'12'} color={'#f25f25'} />
        )}
        <span className={cn(styles.message, passwordStrengthLevels.upperLowerCase && styles.valid)}>
          Use upper and lower case letters (e.g. aA)
        </span>
      </div>
      <div className={styles.messageContainer}>
        {passwordStrengthLevels.number ? (
          <UilCheckCircle size={'12'} color={'#51aa4d'} />
        ) : (
          <UilExclamationCircle size={'12'} color={'#f25f25'} />
        )}
        <span className={cn(styles.message, passwordStrengthLevels.number && styles.valid)}>
          Use a number (e.g. 1234)
        </span>
      </div>
      <div className={styles.messageContainer}>
        {passwordStrengthLevels.symbol ? (
          <UilCheckCircle size={'12'} color={'#51aa4d'} />
        ) : (
          <UilExclamationCircle size={'12'} color={'#f25f25'} />
        )}
        <span className={cn(styles.message, passwordStrengthLevels.symbol && styles.valid)}>
          Use a symbol (e.g. !@#$)
        </span>
      </div>
    </div>
  );
};

export default PasswordStrength;
