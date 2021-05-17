import * as yup from 'yup';

export const defaultValues = {
  title: '',
}

export const validationSchema = yup.object({
  title: yup.string().required('required_field'),
});