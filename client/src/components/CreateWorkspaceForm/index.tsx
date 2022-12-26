import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Input from '@/components/Input';
import Button from '@/components/Button';
import { CreateWorkspaceError } from '@/types';
import styles from './styles.module.scss';
import Spinner from '../Spinner';

interface Props {
  onSubmit: (name: string, key: string) => any;
  loading: boolean;
  error: string;
}

interface Fields {
  name: string;
  key: string;
}

interface FieldErrors {
  name?: string;
  key?: string;
}

const LandingCreateWorkspaceForm: React.FC<Props> = ({ onSubmit, loading, error }) => {
  const { t } = useTranslation();

  const [fields, setFields] = useState<Fields>({
    name: '',
    key: ''
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const [keySubmitted, setKeySubmitted] = useState<string>('');

  const validateFields = (): boolean => {
    let valid = true;
    setFieldErrors({});

    if (fields.name == '') {
      setFieldErrors((prevState) => ({
        ...prevState,
        name: t('Please enter a workspace name.')
      }));
      valid = false;
    }

    if (fields.key == '') {
      setFieldErrors((prevState) => ({
        ...prevState,
        key: t('Please enter a workspace key.')
      }));
      valid = false;
    } else if (fields.key == keySubmitted && error == CreateWorkspaceError.KEY_DUPLICATE) {
      setFieldErrors((prevState) => ({
        ...prevState,
        key: t('This workspace key is not available.')
      }));
    }

    return valid;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value
    });
  };

  const handleKeyUp = () => {
    formSubmitted && validateFields();
  };

  const handleBlur = () => {
    formSubmitted && validateFields();
  };

  const handleKeyBlur = () => {
    setFields({
      ...fields,
      key: fields.key.trim().replace(/\s+/g, '-').toLowerCase()
    });
    formSubmitted && validateFields();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormSubmitted(true);
    setKeySubmitted(fields.key);

    validateFields() && onSubmit(fields.name, fields.key);
  };

  useEffect(() => {
    formSubmitted && validateFields();
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name={'name'}
        required
        label={t('Workspace Name')}
        placeholder={t('Workspace Name')}
        value={fields.name}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        error={!!fieldErrors.name}
        errorMessage={fieldErrors.name}
      />

      <Input
        name={'key'}
        required
        prefix={`${window.location.protocol}//${window.location.hostname}/`}
        label={t('Workspace Key')}
        value={fields.key}
        placeholder={t('Workspace Key')}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={handleKeyBlur}
        error={!!fieldErrors.key}
        errorMessage={fieldErrors.key}
      />
      <div className={styles.buttonWrapper}>
        <Button type="submit">
          {loading ? <Spinner variant={'white'} size={'small'} /> : t('Create Workspace')}
        </Button>
      </div>
    </form>
  );
};

export default LandingCreateWorkspaceForm;
