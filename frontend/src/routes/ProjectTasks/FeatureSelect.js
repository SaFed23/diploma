import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from '../../components/common/Select';

function FeatureSelect({
  values,
  setCurrentValue,
  currentValue
}) {
  const { t } = useTranslation();
  const handleChange = (event) => {
    setCurrentValue(values.find(val => val.id === event.target.value))
  }

  return (
    <Select
      title={t('feature')}
      values={values}
      onChange={handleChange}
      currentValue={currentValue?.id || ''}
      fullWidth={true}
    />
  )
};

export default FeatureSelect