import * as yup from 'yup';

export const defaultValues = {
  title: '',
  description: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0],
}

export const validationSchema = yup.object({
  title: yup.string().required('required_field'),
  description: yup.string(),
  startDate: yup.date().required('required_field'),
  endDate: yup.date().required('required_field'),
});