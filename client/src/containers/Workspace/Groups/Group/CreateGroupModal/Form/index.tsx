import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Input from '@/components/Input';

interface Fields {
  name: string;
}

const CreateGroupModalForm: React.FC = () => {
  const { t } = useTranslation();

  const [fields, setFields] = useState<Fields>({
    name: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form>
      <Input
        name="name"
        label={t('Group Name')}
        placeholder={t('Group Name')}
        value={fields.name}
        onChange={handleChange}
        required
      />
    </form>
  );
};

export default CreateGroupModalForm;
