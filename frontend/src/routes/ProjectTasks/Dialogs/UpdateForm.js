import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SelectComponent from '../../../components/common/Select';
import useForm from '../../../hooks/useForm';
import CreateForm from './CreateForm';

function UpdateForm({
  submit,
  features,
}) {
  const { t } = useTranslation();
  const [currentFeature, setFeature] = useState('');
  const [defaultValues, setDefaultValues] = useState({ title: "" });
  const schema = yup.object({
    title: yup.string(),
    description: yup.string(),
  });
  const { reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const chooseFeature = ({ target }) => {
    const feature = features.find(f => f.id === target.value);
    setFeature(feature.id);
    setDefaultValues({
      id: feature.id,
      title: feature.title,
      description: feature.description || "",
      projectId: feature.project.id,
    });
  };

  return (
    <>
      <SelectComponent
        fullWidth
        currentValue={currentFeature}
        onChange={chooseFeature}
        title={t("feature")}
        values={features}
      />
      {currentFeature
        && <CreateForm
          defaultValues={defaultValues}
          submit={submit}
        />
      }
    </>
  )
};

export default UpdateForm;