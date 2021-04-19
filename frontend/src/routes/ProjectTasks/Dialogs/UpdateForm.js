import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button } from '@material-ui/core';
import SelectComponent from '../../../components/common/Select';

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
  const { handleSubmit, formState: { errors }, control, reset } = useForm({
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
      {currentFeature && <form onSubmit={handleSubmit(submit)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <TextField fullWidth
            label={t("title")}
            variant="outlined"
            margin="normal"
            autoFocus
            error={!!errors.username}
            helperText={errors.username?.message}
            {...field}
          />}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => <TextField
            fullWidth
            multiline
            label={t("description")}
            variant="outlined"
            margin="normal"
            autoFocus
            error={!!errors.description}
            helperText={errors.description?.message}
            {...field}
          />}
        />
        <Button fullWidth type="submit" variant="contained" color="primary">
          {t("update")}
        </Button>
      </form>}
    </>
  )
};

export default UpdateForm;