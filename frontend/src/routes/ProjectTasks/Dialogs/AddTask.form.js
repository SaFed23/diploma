import * as yup from 'yup';

export const defaultValues = {
  title: '',
  description: '',
  assign: false,
}

export const validationSchema = yup.object({
  title: yup.string().required('required_field'),
  description: yup.string(),
  assign: yup.bool(),
});