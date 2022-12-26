import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UilExclamationCircle } from '@iconscout/react-unicons';
import { useTranslation } from 'react-i18next';

import { LoginError } from '@/types';
import urls from '@/util/urls';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import styles from './styles.module.scss';

interface Props {
  onSubmit: (email: string, password: string) => any;
  loading: boolean;
  error: string;
}

interface Fields {
  email: string;
  password: string;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

const LoginForm: React.FC<Props> = ({ onSubmit, loading, error }) => {
  const { t } = useTranslation();

  const [fields, setFields] = useState<Fields>({
    email: '',
    password: ''
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const validateFields = (): boolean => {
    let valid = true;
    setFieldErrors({});

    if (fields.email == '') {
      setFieldErrors((prevState) => ({
        ...prevState,
        email: t('Please enter your email.')
      }));
      valid = false;
    } else if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        fields.email
      )
    ) {
      setFieldErrors((prevState) => ({
        ...prevState,
        email: t('Please enter a valid email.')
      }));
      valid = false;
    }

    if (fields.password == '') {
      setFieldErrors((prevState) => ({
        ...prevState,
        password: t('Please enter your password.')
      }));
      valid = false;
    }

    return valid;
  };

  const handleKeyUp = () => {
    formSubmitted && validateFields();
  };

  const handleBlur = () => {
    formSubmitted && validateFields();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value
    });

    formSubmitted && validateFields();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    validateFields() && onSubmit(fields.email, fields.password);
  };

  const getError = () => {
    if (!error) return;

    if (error == LoginError.INCORRECT_EMAIL_PASSWORD) {
      return (
        <p>
          Sorry, we couldn't find an account with these credentials. Please{' '}
          <Link to={urls.signup}>signup</Link> if you don't have an account.
        </p>
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className={styles.loginErrorWrapper}>
          <div className={styles.iconWrapper}>
            <UilExclamationCircle size={'25'} />
          </div>
          {getError()}
        </div>
      )}

      <Input
        name={'email'}
        required
        label={t('Email')}
        placeholder={t('Email')}
        value={fields.email}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        error={!!fieldErrors.email}
        errorMessage={fieldErrors.email}
        autoFocus={true}
      />
      <Input
        name={'password'}
        required
        type={'password'}
        label={t('Password')}
        placeholder={t('Password')}
        value={fields.password}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        error={!!fieldErrors.password}
        errorMessage={fieldErrors.password}
      />

      <div className={styles.buttonWrapper}>
        <Button type="submit">
          {loading ? <Spinner variant={'white'} size={'small'} /> : t('Login')}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
