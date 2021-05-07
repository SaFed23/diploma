import * as yup from 'yup';

export const defaultValues = {
  title: '',
  description: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0],
}

export const validationSchema = yup.object({
  title: yup.string().required('Обязательное поле'),
  description: yup.string(),
  startDate: yup.date().required('Обязательное поле'),
  endDate: yup.date().required('Обязательное поле'),
});