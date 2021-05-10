import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup.string().required('Обязательное поле'),
  description: yup.string(),
  startDate: yup.date().required('Обязательное поле'),
  endDate: yup.date().required('Обязательное поле'),
});