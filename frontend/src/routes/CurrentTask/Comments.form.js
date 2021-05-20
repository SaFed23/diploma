import * as yup from 'yup';

export const defaultValues = {
  description: '',
}

export const validationSchema = yup.object({
  description: yup.string().required('required_field'),
});