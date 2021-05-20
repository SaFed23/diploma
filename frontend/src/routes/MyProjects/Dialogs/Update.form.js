import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup.string().required('required_field'),
  description: yup.string(),
  startDate: yup.date().required('required_field'),
  endDate: yup.date().required('required_field'),
});