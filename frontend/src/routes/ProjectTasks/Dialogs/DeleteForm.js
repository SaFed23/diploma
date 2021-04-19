import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SelectComponent from '../../../components/common/Select';

function DeleteForm({
  submit,
  features,
}) {
  const { t } = useTranslation();
  const [currentFeature, setFeature] = useState('');

  return (
    <>
      <SelectComponent
        fullWidth
        currentValue={currentFeature}
        onChange={({ target }) => setFeature(target.value)}
        title={t("feature")}
        values={features}
      />
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        style={{ marginTop: 10 }}
        onClick={() => submit(currentFeature)}
      >
        {t("delete")}
      </Button>
    </>
  )
};

export default DeleteForm;