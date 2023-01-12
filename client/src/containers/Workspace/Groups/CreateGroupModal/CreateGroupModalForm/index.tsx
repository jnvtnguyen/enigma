import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Input from '@/components/Input';
import Select from '@/components/Select';
import { ProjectPermission } from '@/types';

type SelectOption = {
  label: string;
  value: ProjectPermission;
};

const CreateGroupModalForm: React.FC = () => {
  const { t } = useTranslation();

  const [name, setName] = useState<string>('');
  const [defaultPermission, setDefaultPermission] = useState<ProjectPermission>('read');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDefaultPermissionChange = (option: SelectOption) => {
    setDefaultPermission(option.value);
  };

  const defaultPermissionOptions: SelectOption[] = [
    { label: 'Read', value: 'read' },
    { label: 'Write', value: 'write' },
    { label: 'Admin', value: 'admin' }
  ];

  return (
    <form>
      <Input
        name="name"
        label={t('Group Name')}
        placeholder={t('Group Name')}
        value={name}
        onChange={handleNameChange}
        required
      />

      <Select
        options={defaultPermissionOptions}
        getOptionLabel={(option: SelectOption) => option.label}
        getOptionValue={(option: SelectOption) => option.value}
        name="default_permission"
        label={t('Default Permission')}
        value={defaultPermissionOptions.find((x) => x.value == defaultPermission)}
        onChange={handleDefaultPermissionChange}
        required
      />
    </form>
  );
};

export default CreateGroupModalForm;
