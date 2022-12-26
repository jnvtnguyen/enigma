import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SignupError } from '@/types';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import styles from './styles.module.scss';
import PasswordStrength from '@/components/PasswordStrength';

interface Props {
  onSubmit: (firstName: string, lastName: string, email: string, password: string) => any;
  loading: boolean;
  error: string;
}

interface Fields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupForm: React.FC<Props> = ({ onSubmit, loading, error }) => {
  const { t } = useTranslation();

  const [fields, setFields] = useState<Fields>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const [isPasswordStrong, setIsPasswordStrong] = useState<boolean>(false);

  const [emailSubmitted, setEmailSubmitted] = useState<string>('');

  const [hasPasswordFocus, setHasPasswordFocus] = useState<boolean>(false);

  const validateFields = (): boolean => {
    let valid = true;
    setFieldErrors({});

    if (fields.firstName == '') {
      setFieldErrors((prevState) => ({
        ...prevState,
        firstName: t('Please enter your first name.')
      }));
      valid = false;
    }

    if (fields.lastName == '') {
      setFieldErrors((prevState) => ({
        ...prevState,
        lastName: t('Please enter your last name.')
      }));
      valid = false;
    }

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
    } else if (fields.email == emailSubmitted && error == SignupError.DUPLICATE_EMAIL) {
      setFieldErrors((prevState) => ({
        ...prevState,
        email: t('This email is already in use. Please enter another email.')
      }));
    }

    if (fields.confirmPassword == '') {
      setFieldErrors((prevState) => ({
        ...prevState,
        confirmPassword: t('Please confirm your password.')
      }));
      valid = false;
    } else if (fields.confirmPassword != fields.password) {
      setFieldErrors((prevState) => ({
        ...prevState,
        confirmPassword: t('Confirm password does not match your password.')
      }));
      valid = false;
    }

    if (!isPasswordStrong) {
      valid = false;
    }

    return valid;
  };

  const handlePasswordStrengthChange = (passwordStrong: boolean) => {
    setIsPasswordStrong(passwordStrong);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value
    });

    formSubmitted && validateFields();
  };

  const handleKeyUp = () => {
    formSubmitted && validateFields();
  };

  const handleBlur = () => {
    formSubmitted && validateFields();
  };

  const handlePasswordFocus = () => {
    !hasPasswordFocus && setHasPasswordFocus(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormSubmitted(true);
    setEmailSubmitted(fields.email);

    validateFields() && onSubmit(fields.firstName, fields.lastName, fields.email, fields.password);
  };

  useEffect(() => {
    formSubmitted && validateFields();
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name={'firstName'}
        required
        label={t('First Name')}
        placeholder={t('First Name')}
        value={fields.firstName}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        error={!!fieldErrors.firstName}
        errorMessage={fieldErrors.firstName}
        autoFocus={true}
      />

      <Input
        name={'lastName'}
        required
        label={t('Last Name')}
        placeholder={t('Last Name')}
        value={fields.lastName}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        error={!!fieldErrors.lastName}
        errorMessage={fieldErrors.lastName}
      />

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
        onFocus={handlePasswordFocus}
        onBlur={handleBlur}
        error={(hasPasswordFocus || formSubmitted) && !isPasswordStrong}
        errorMessage={
          (hasPasswordFocus || formSubmitted) && (
            <PasswordStrength
              password={fields.password}
              onPasswordStrengthChange={handlePasswordStrengthChange}
            />
          )
        }
      />

      <Input
        name={'confirmPassword'}
        required
        type={'password'}
        label={t('Confirm Password')}
        placeholder={t('Confirm Password')}
        value={fields.confirmPassword}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        error={!!fieldErrors.confirmPassword}
        errorMessage={fieldErrors.confirmPassword}
      />

      <div className={styles.buttonWrapper}>
        <Button type="submit">
          {loading ? <Spinner variant={'white'} size={'small'} /> : t('Sign Up')}
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
