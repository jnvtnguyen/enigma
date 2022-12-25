import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './styles.module.scss';

interface Props {}

interface Fields {
  name: string;
  key: string;
}

interface FieldErrors {
  name?: string;
  key?: string;
}

const LandingCreateWorkspaceForm: React.FC<Props> = () => {
  const { t } = useTranslation();

  const [fields, setFields] = useState<Fields>({
    name: '',
    key: ''
  });

  return (
    <form>
      <Input name={'name'} required label={t('Workspace Name')} placeholder={t('Workspace Name')} />

      <Input
        name={'key'}
        required
        prefix={`${window.location.protocol}//${window.location.hostname}/`}
        label={t('Workspace Key')}
        placeholder={t('Workspace Key')}
      />
      <div>
        <Button type="submit">{t('Create Workspace')}</Button>
      </div>
    </form>
  );
};

export default LandingCreateWorkspaceForm;
