import * as yup from 'yup';

export const defaultValues = {
  username: '',
  email: '',
  roleId: ``,
}

export const validationSchema = yup.object({
  username: yup
    .string()
    .required('required_field')
    .min(4, 'login_cannot_be_less_then_4')
    .max(36, 'login_cannot_be_more_then_36'),
  email: yup.string().required('required_field'),
  roleId: yup.string().required('required_field'),
});